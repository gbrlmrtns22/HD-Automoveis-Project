import type { AutoCertoProvider, SyncCursor, SyncResult } from "./provider";
import type { ProviderVehicle } from "../types/vehicle";

const mockVehicles: ProviderVehicle[] = [
  {
    id: "mock-1",
    title: "Honda Civic 2022",
    price: 115000,
    available: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: "mock-2",
    title: "Toyota Corolla 2021",
    price: 98000,
    available: true,
    updatedAt: new Date().toISOString()
  }
];

export class MockAutoCertoProvider implements AutoCertoProvider {
  async fetchVehicles(cursor?: SyncCursor): Promise<SyncResult> {
    return {
      vehicles: mockVehicles,
      nextCursor: cursor
    };
  }

  async fetchVehicleById(id: string): Promise<ProviderVehicle | null> {
    return mockVehicles.find((vehicle) => vehicle.id === id) ?? null;
  }
}
