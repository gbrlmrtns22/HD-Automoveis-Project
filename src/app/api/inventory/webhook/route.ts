import { NextResponse } from "next/server";
import { createAutoCertoProvider } from "@/modules/inventory/providers/autocerto";
import { runInventorySync } from "@/modules/inventory/sync/engine";

export async function POST(request: Request) {
  const provider = createAutoCertoProvider();
  const signature = request.headers.get("x-autocerto-signature");
  const payload = await request.text();
  if (!provider.verifyWebhook(signature, payload)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  await runInventorySync();
  return NextResponse.json({ ok: true });
}
