import { NextResponse } from "next/server";
import { runInventorySync } from "@/modules/inventory/sync/engine";

export async function POST() {
  const summary = await runInventorySync();
  return NextResponse.json(summary);
}
