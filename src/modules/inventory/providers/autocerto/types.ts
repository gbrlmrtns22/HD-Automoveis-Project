import { z } from 'zod';

export const autoCertoVehicleSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  price: z.number(),
  updatedAt: z.string()
});

export type AutoCertoVehicle = z.infer<typeof autoCertoVehicleSchema>;

export interface AutoCertoProvider {
  listVehicles: (cursor?: string) => Promise<{
    vehicles: AutoCertoVehicle[];
    nextCursor?: string;
  }>;
  upsertVehicle: (vehicle: AutoCertoVehicle, idempotencyKey: string) => Promise<void>;
}
