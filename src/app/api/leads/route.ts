import { NextResponse } from "next/server";
import { leadSchema } from "@/modules/leads/schema";
import { normalizeWhatsapp, scoreLead } from "@/modules/leads/scoring";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { inMemoryLeadStore } from "@/modules/leads/store";
import { inMemoryLeadEvents } from "@/modules/leads/events";
import { createRateLimiter } from "@/lib/rate-limit";

const generateId = () => `lead_${Math.random().toString(36).slice(2, 10)}`;

export async function POST(request: Request) {
  const limiter = createRateLimiter(10, "1 m");
  if (limiter) {
    const ip = request.headers.get("x-forwarded-for") ?? "local";
    const { success } = await limiter.limit(`lead-${ip}`);
    if (!success) {
      return NextResponse.json({ error: "Rate limit" }, { status: 429 });
    }
  }

  const body = await request.json();
  const parsed = leadSchema.parse(body);
  const normalizedWhatsapp = normalizeWhatsapp(parsed.whatsapp);
  const score = scoreLead(parsed);

  const supabase = createSupabaseServiceClient();
  const id = generateId();
  const payload = {
    id,
    name: encrypt(parsed.name),
    whatsapp: normalizedWhatsapp,
    current_vehicle: encrypt(parsed.currentVehicle ?? ""),
    score,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    const existing = await supabase.from("leads").select("id").eq("whatsapp", normalizedWhatsapp).maybeSingle();
    if (existing.data) {
      await supabase.from("lead_consents").insert({
        lead_id: existing.data.id,
        consented_at: new Date().toISOString(),
        consent_text: "Consentimento LGPD"
      });
      await supabase.from("lead_events").insert({
        id: generateId(),
        type: "lead.duplicate",
        payload: { whatsapp: normalizedWhatsapp },
        created_at: new Date().toISOString()
      });
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await supabase.from("leads").insert(payload);
    await supabase.from("lead_quiz_responses").insert({
      lead_id: id,
      responses: parsed.quiz
    });
    await supabase.from("lead_consents").insert({
      lead_id: id,
      consented_at: new Date().toISOString(),
      consent_text: "Consentimento LGPD"
    });
    await supabase.from("lead_events").insert({
      id: generateId(),
      type: "lead.created",
      payload: { score },
      created_at: new Date().toISOString()
    });
  } else {
    const existing = inMemoryLeadStore.findByWhatsapp(normalizedWhatsapp);
    if (existing) {
      inMemoryLeadEvents.add({
        id: generateId(),
        type: "lead.duplicate",
        payload: { whatsapp: normalizedWhatsapp },
        createdAt: new Date().toISOString()
      });
      return NextResponse.json({ ok: true, duplicate: true });
    }
    inMemoryLeadStore.add({
      id,
      name: parsed.name,
      whatsapp: normalizedWhatsapp,
      consent: parsed.consent,
      quiz: parsed.quiz,
      currentVehicle: parsed.currentVehicle,
      score,
      createdAt: new Date().toISOString()
    });
    inMemoryLeadEvents.add({
      id: generateId(),
      type: "lead.created",
      payload: { score },
      createdAt: new Date().toISOString()
    });
  }

  return NextResponse.json({ ok: true });
}
