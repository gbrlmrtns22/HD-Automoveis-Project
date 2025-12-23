import { autocertoProvider } from "../providers/autocerto";
import { supabaseServerClient } from "@/lib/supabase/server";
import { providerVehicleSchema } from "../providers/types/vehicle";

export type SyncSummary = {
  runId: string;
  processed: number;
  created: number;
  updated: number;
  errors: number;
};

export const runInventorySync = async (): Promise<SyncSummary> => {
  const supabase = supabaseServerClient();
  const provider = autocertoProvider();

  const { data: run } = await supabase
    .from("sync_runs")
    .insert({ status: "running", source: "autocerto" })
    .select("id")
    .single();

  if (!run) {
    throw new Error("Unable to start sync run");
  }

  let processed = 0;
  let created = 0;
  let updated = 0;
  let errors = 0;

  const { vehicles } = await provider.fetchVehicles();

  for (const vehicle of vehicles) {
    processed += 1;
    const parsed = providerVehicleSchema.safeParse(vehicle);
    if (!parsed.success) {
      errors += 1;
      await supabase.from("sync_logs").insert({
        sync_run_id: run.id,
        entity_id: vehicle.id,
        entity_type: "vehicle",
        status: "failed",
        message: "Invalid payload"
      });
      continue;
    }

    const payload = parsed.data;
    const { data: existing } = await supabase
      .from("vehicles")
      .select("id")
      .eq("provider_id", payload.id)
      .maybeSingle();

    const upsertPayload = {
      id: existing?.id,
      provider_id: payload.id,
      title: payload.title,
      price: payload.price,
      available: payload.available,
      provider_hash: `${payload.id}-${payload.updatedAt}`,
      last_synced_at: new Date().toISOString()
    };

    const { error } = await supabase.from("vehicles").upsert(upsertPayload, { onConflict: "provider_id" });

    if (error) {
      errors += 1;
      await supabase.from("sync_logs").insert({
        sync_run_id: run.id,
        entity_id: payload.id,
        entity_type: "vehicle",
        status: "failed",
        message: error.message
      });
    } else if (existing) {
      updated += 1;
    } else {
      created += 1;
    }
  }

  await supabase.from("sync_runs").update({
    status: errors > 0 ? "partial" : "success",
    processed,
    created,
    updated,
    errors
  }).eq("id", run.id);

  return {
    runId: run.id,
    processed,
    created,
    updated,
    errors
  };
};
