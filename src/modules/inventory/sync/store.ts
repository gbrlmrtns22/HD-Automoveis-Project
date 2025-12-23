import type { Vehicle } from "@/modules/inventory/types/vehicle";

export type SyncRun = {
  id: string;
  startedAt: string;
  finishedAt?: string;
  status: "running" | "success" | "partial" | "failed";
  totalProcessed: number;
  totalFailed: number;
};

export type SyncLog = {
  id: string;
  runId: string;
  level: "info" | "error" | "warn";
  message: string;
  payload?: Record<string, string | number | boolean>;
  createdAt: string;
};

const vehicles = new Map<string, Vehicle>();
const syncRuns: SyncRun[] = [];
const syncLogs: SyncLog[] = [];
let cursor: string | null = null;

export const inMemoryInventoryStore = {
  getVehicles() {
    return Array.from(vehicles.values());
  },
  upsertVehicles(items: Vehicle[]) {
    items.forEach((vehicle) => vehicles.set(vehicle.id, vehicle));
  },
  getSyncCursor() {
    return cursor;
  },
  setSyncCursor(next: string | null) {
    cursor = next;
  },
  addSyncRun(run: SyncRun) {
    syncRuns.unshift(run);
  },
  updateSyncRun(runId: string, patch: Partial<SyncRun>) {
    const index = syncRuns.findIndex((run) => run.id === runId);
    if (index >= 0) {
      syncRuns[index] = { ...syncRuns[index], ...patch };
    }
  },
  addLog(log: SyncLog) {
    syncLogs.unshift(log);
  },
  getRuns() {
    return syncRuns;
  },
  getLogs() {
    return syncLogs;
  }
};
