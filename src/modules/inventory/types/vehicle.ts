import { z } from "zod";

export const vehicleImageSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  url: z.string().url(),
  alt: z.string().min(1)
});

export const vehicleSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  brand: z.string(),
  model: z.string(),
  year: z.number().int().min(1990),
  price: z.number().int().min(0),
  mileage: z.number().int().min(0),
  fuel: z.enum(["flex", "diesel", "electric", "hybrid", "gasoline"]),
  transmission: z.enum(["manual", "automatic"]),
  color: z.string(),
  published: z.boolean(),
  updatedAt: z.string(),
  images: z.array(vehicleImageSchema).default([])
});

export type Vehicle = z.infer<typeof vehicleSchema>;
export type VehicleImage = z.infer<typeof vehicleImageSchema>;
