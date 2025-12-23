import { createHash } from "node:crypto";
import type { AutoCertoProvider, AutoCertoSyncResult } from "@/modules/inventory/providers/autocerto/provider";
import type { AutoCertoVehicle } from "@/modules/inventory/providers/autocerto/types";

const mockVehicles: AutoCertoVehicle[] = [
  {
    id: "veh_001",
    title: "Volkswagen T-Cross Highline",
    brand: "Volkswagen",
    model: "T-Cross",
    year: 2023,
    price: 148900,
    mileage: 12000,
    fuel: "flex",
    transmission: "automatic",
    color: "Azul",
    published: true,
    updatedAt: new Date().toISOString(),
    images: [
      {
        id: "img_001",
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        alt: "Volkswagen T-Cross azul"
      }
    ]
  },
  {
    id: "veh_002",
    title: "Toyota Corolla Hybrid",
    brand: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 179900,
    mileage: 5000,
    fuel: "hybrid",
    transmission: "automatic",
    color: "Prata",
    published: true,
    updatedAt: new Date().toISOString(),
    images: [
      {
        id: "img_002",
        url: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
        alt: "Toyota Corolla prata"
      }
    ]
  }
];

export class MockAutoCertoProvider implements AutoCertoProvider {
  name = "mock";

  async fetchVehicles(cursor: string | null): Promise<AutoCertoSyncResult> {
    const start = cursor ? Number(cursor) : 0;
    const pageSize = 50;
    const slice = mockVehicles.slice(start, start + pageSize);
    return {
      vehicles: slice,
      cursor: {
        cursor: start + pageSize < mockVehicles.length ? String(start + pageSize) : null,
        hasMore: start + pageSize < mockVehicles.length
      }
    };
  }

  async fetchVehicleById(id: string): Promise<AutoCertoVehicle | null> {
    return mockVehicles.find((vehicle) => vehicle.id === id) ?? null;
  }

  verifyWebhook(signature: string | null, payload: string): boolean {
    if (!signature) {
      return false;
    }
    const expected = createHash("sha256").update(payload).digest("hex");
    return signature === expected;
  }
}
