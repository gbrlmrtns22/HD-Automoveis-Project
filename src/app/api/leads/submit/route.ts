import { NextResponse } from "next/server";
import { leadQuizSchema } from "@/modules/leads/schemas";
import { normalizeWhatsApp, scoreLead } from "@/modules/leads/scoring";
import { supabaseServerClient } from "@/lib/supabase/server";
import { encryptText } from "@/lib/crypto";
import { leadRateLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = leadQuizSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  if (leadRateLimiter) {
    const { success } = await leadRateLimiter.limit(`lead:${ip}`);
    if (!success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
  }

  const input = parseResult.data;
  const normalizedWhatsapp = normalizeWhatsApp(input.whatsapp);
  const { score, tier } = scoreLead(input);
  const supabase = supabaseServerClient();

  const { data: existingLead } = await supabase
    .from("leads")
    .select("id")
    .eq("whatsapp", normalizedWhatsapp)
    .maybeSingle();

  const encryptedName = encryptText(input.name);
  const encryptedEmail = encryptText(input.email);

  const leadPayload = {
    id: existingLead?.id,
    whatsapp: normalizedWhatsapp,
    name_encrypted: encryptedName,
    email_encrypted: encryptedEmail,
    score,
    tier
  };

  const { data: leadRow, error } = await supabase
    .from("leads")
    .upsert(leadPayload, { onConflict: "whatsapp" })
    .select("id")
    .single();

  if (error || !leadRow) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  await supabase.from("lead_quiz_responses").insert({
    lead_id: leadRow.id,
    responses: input
  });

  await supabase.from("lead_consents").insert({
    lead_id: leadRow.id,
    consent_type: "marketing",
    granted: true
  });

  await supabase.from("lead_events_queue").insert({
    lead_id: leadRow.id,
    event_type: "lead_created",
    payload: { score, tier }
  });

  return NextResponse.json({ leadId: leadRow.id, score, tier });
}
