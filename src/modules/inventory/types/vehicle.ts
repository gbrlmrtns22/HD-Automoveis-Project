import { z } from 'zod';

export const vehicleSchema = z.object({
  id: z.string().uuid(),
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.number().nonnegative(),
  published: z.boolean(),
  updatedAt: z.string()
});

export type Vehicle = z.infer<typeof vehicleSchema>;
