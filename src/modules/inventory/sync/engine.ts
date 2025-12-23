import { createAutoCertoProvider } from "@/modules/inventory/providers/autocerto";
import { vehicleSchema } from "@/modules/inventory/types/vehicle";
import { inMemoryInventoryStore } from "@/modules/inventory/sync/store";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const generateId = () => `sync_${Math.random().toString(36).slice(2, 10)}`;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const withRetry = async <T,>(fn: () => Promise<T>, retries = 3) => {
  let attempt = 0;
  let lastError: unknown;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const delay = Math.min(1000 * 2 ** attempt, 8000);
      await sleep(delay);
      attempt += 1;
    }
  }
  throw lastError;
};

export const runInventorySync = async () => {
  const provider = createAutoCertoProvider();
  const supabase = createSupabaseServiceClient();
  const runId = generateId();
  const startedAt = new Date().toISOString();
  inMemoryInventoryStore.addSyncRun({
    id: runId,
    startedAt,
    status: "running",
    totalProcessed: 0,
    totalFailed: 0
  });
  inMemoryInventoryStore.addLog({
    id: generateId(),
    runId,
    level: "info",
    message: `Iniciando sync com ${provider.name}`,
    createdAt: startedAt
  });

  if (supabase) {
    await supabase.from("sync_runs").insert({
      id: runId,
      started_at: startedAt,
      status: "running",
      total_processed: 0,
      total_failed: 0
    });
  }

  let cursor = inMemoryInventoryStore.getSyncCursor();
  let totalProcessed = 0;
  let totalFailed = 0;
  let hasMore = true;

  while (hasMore) {
    const batch = await withRetry(() => provider.fetchVehicles(cursor), 2);
    const validVehicles = batch.vehicles.map((vehicle) =>
      vehicleSchema.parse({
        ...vehicle,
        images: vehicle.images.map((image) => ({
          id: image.id,
          vehicleId: vehicle.id,
          url: image.url,
          alt: image.alt
        }))
      })
    );

    totalProcessed += validVehicles.length;

    if (supabase) {
      const { error: vehicleError } = await withRetry(
        () =>
          supabase.from("vehicles").upsert(
            validVehicles.map((vehicle) => ({
              id: vehicle.id,
              title: vehicle.title,
              brand: vehicle.brand,
              model: vehicle.model,
              year: vehicle.year,
              price: vehicle.price,
              mileage: vehicle.mileage,
              fuel: vehicle.fuel,
              transmission: vehicle.transmission,
              color: vehicle.color,
              published: vehicle.published,
              updated_at: vehicle.updatedAt
            })),
            { onConflict: "id" }
          ),
        2
      );
      if (vehicleError) {
        totalFailed += validVehicles.length;
        inMemoryInventoryStore.addLog({
          id: generateId(),
          runId,
          level: "error",
          message: "Falha ao sincronizar veículos",
          payload: { error: vehicleError.message },
          createdAt: new Date().toISOString()
        });
        if (supabase) {
          await supabase.from("sync_logs").insert({
            id: generateId(),
            run_id: runId,
            level: "error",
            message: "Falha ao sincronizar veículos",
            payload: { error: vehicleError.message },
            created_at: new Date().toISOString()
          });
        }
      } else {
        await withRetry(
          () =>
            supabase.from("vehicle_images").upsert(
              validVehicles.flatMap((vehicle) =>
                vehicle.images.map((image) => ({
                  id: image.id,
                  vehicle_id: vehicle.id,
                  url: image.url,
                  alt: image.alt
                }))
              ),
              { onConflict: "id" }
            ),
          2
        );
      }
    } else {
      inMemoryInventoryStore.upsertVehicles(validVehicles);
    }

    cursor = batch.cursor.cursor;
    inMemoryInventoryStore.setSyncCursor(cursor);
    hasMore = batch.cursor.hasMore;
  }

  const finishedAt = new Date().toISOString();
  const status = totalFailed > 0 ? "partial" : "success";
  inMemoryInventoryStore.updateSyncRun(runId, { finishedAt, status, totalProcessed, totalFailed });
  inMemoryInventoryStore.addLog({
    id: generateId(),
    runId,
    level: "info",
    message: "Sync finalizado",
    payload: { totalProcessed, totalFailed },
    createdAt: finishedAt
  });

  if (supabase) {
    await supabase.from("sync_runs").update({
      finished_at: finishedAt,
      status,
      total_processed: totalProcessed,
      total_failed: totalFailed
    }).eq("id", runId);
    await supabase.from("sync_logs").insert({
      id: generateId(),
      run_id: runId,
      level: "info",
      message: "Sync finalizado",
      payload: { totalProcessed, totalFailed },
      created_at: finishedAt
    });
  }

  return { runId, status, totalProcessed, totalFailed };
};
