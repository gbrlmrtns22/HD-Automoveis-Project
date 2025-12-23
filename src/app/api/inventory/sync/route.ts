import { NextResponse } from "next/server";
import { runInventorySync } from "@/modules/inventory/sync/engine";
import { inMemoryInventoryStore } from "@/modules/inventory/sync/store";
import { createRateLimiter } from "@/lib/rate-limit";
import { inMemoryAuditLog } from "@/modules/admin/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  if (supabase) {
    const { data: runs } = await supabase.from("sync_runs").select("*").order("started_at", { ascending: false });
    const { data: logs } = await supabase.from("sync_logs").select("*").order("created_at", { ascending: false }).limit(50);
    return NextResponse.json({
      runs: (runs ?? []).map((run) => ({
        id: run.id,
        startedAt: run.started_at,
        finishedAt: run.finished_at,
        status: run.status,
        totalProcessed: run.total_processed,
        totalFailed: run.total_failed
      })),
      logs: (logs ?? []).map((log) => ({
        id: log.id,
        runId: log.run_id,
        level: log.level,
        message: log.message,
        payload: log.payload ?? undefined,
        createdAt: log.created_at
      })),
      audit: inMemoryAuditLog.list()
    });
  }
  return NextResponse.json({
    runs: inMemoryInventoryStore.getRuns(),
    logs: inMemoryInventoryStore.getLogs(),
    audit: inMemoryAuditLog.list()
  });
}

export async function POST(request: Request) {
  const limiter = createRateLimiter(5, "1 m");
  if (limiter) {
    const ip = request.headers.get("x-forwarded-for") ?? "local";
    const { success } = await limiter.limit(`sync-${ip}`);
    if (!success) {
      return NextResponse.json({ error: "Rate limit" }, { status: 429 });
    }
  }
  inMemoryAuditLog.add({
    id: `audit_${Date.now()}`,
    action: "inventory.sync.triggered",
    actor: "admin",
    createdAt: new Date().toISOString()
  });
  const result = await runInventorySync();
  return NextResponse.json(result);
}
