import type { ProviderVehicle } from "../types/vehicle";

export type SyncCursor = {
  lastUpdatedAt?: string;
};

export type SyncResult = {
  vehicles: ProviderVehicle[];
  nextCursor?: SyncCursor;
};

export interface AutoCertoProvider {
  fetchVehicles(cursor?: SyncCursor): Promise<SyncResult>;
  fetchVehicleById(id: string): Promise<ProviderVehicle | null>;
}
