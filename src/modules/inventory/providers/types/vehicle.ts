import { z } from "zod";

export const providerVehicleSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  available: z.boolean(),
  updatedAt: z.string().datetime()
});

export type ProviderVehicle = z.infer<typeof providerVehicleSchema>;
