import crypto from "crypto";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { supabaseServerClient } from "@/lib/supabase/server";
import { runInventorySync } from "@/modules/inventory/sync/engine";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-autocerto-signature") ?? "";

  if (!env.AUTOCERTO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const expected = crypto
    .createHmac("sha256", env.AUTOCERTO_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const supabase = supabaseServerClient();
  await supabase.from("sync_logs").insert({
    entity_type: "webhook",
    entity_id: crypto.randomUUID(),
    status: "received",
    message: body
  });

  await runInventorySync();

  return NextResponse.json({ status: "ok" });
}
