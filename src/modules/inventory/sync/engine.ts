import type { AutoCertoProvider } from '../providers/autocerto/types';
import type { Vehicle } from '../types/vehicle';
import { randomUUID } from 'crypto';

export type SyncResult = {
  runId: string;
  total: number;
  synced: number;
  failed: number;
  logs: Array<{ level: 'info' | 'error'; message: string }>;
};

export async function runInventorySync(
  provider: AutoCertoProvider,
  onVehicle: (vehicle: Vehicle) => Promise<void>
): Promise<SyncResult> {
  const runId = randomUUID();
  const logs: SyncResult['logs'] = [];
  let total = 0;
  let synced = 0;
  let failed = 0;

  const response = await provider.listVehicles();
  for (const vehicle of response.vehicles) {
    total += 1;
    try {
      await onVehicle({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        price: vehicle.price,
        published: true,
        updatedAt: vehicle.updatedAt
      });
      synced += 1;
      logs.push({ level: 'info', message: `Synced ${vehicle.model}` });
    } catch (error) {
      failed += 1;
      logs.push({ level: 'error', message: `Erro ao sincronizar ${vehicle.model}` });
    }
  }

  return { runId, total, synced, failed, logs };
}
