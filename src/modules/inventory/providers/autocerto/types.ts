import { z } from "zod";

export const autoCertoVehicleSchema = z.object({
  id: z.string(),
  title: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int(),
  price: z.number().int(),
  mileage: z.number().int(),
  fuel: z.enum(["flex", "diesel", "electric", "hybrid", "gasoline"]),
  transmission: z.enum(["manual", "automatic"]),
  color: z.string(),
  published: z.boolean(),
  updatedAt: z.string(),
  images: z.array(z.object({ id: z.string(), url: z.string().url(), alt: z.string() }))
});

export const autoCertoSyncCursorSchema = z.object({
  cursor: z.string().nullable(),
  hasMore: z.boolean()
});

export type AutoCertoVehicle = z.infer<typeof autoCertoVehicleSchema>;
export type AutoCertoSyncCursor = z.infer<typeof autoCertoSyncCursorSchema>;
