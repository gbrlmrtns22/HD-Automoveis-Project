import type { AutoCertoSyncCursor, AutoCertoVehicle } from "@/modules/inventory/providers/autocerto/types";

export type AutoCertoSyncResult = {
  vehicles: AutoCertoVehicle[];
  cursor: AutoCertoSyncCursor;
};

export interface AutoCertoProvider {
  name: string;
  fetchVehicles(cursor: string | null): Promise<AutoCertoSyncResult>;
  fetchVehicleById(id: string): Promise<AutoCertoVehicle | null>;
  verifyWebhook(signature: string | null, payload: string): boolean;
}
