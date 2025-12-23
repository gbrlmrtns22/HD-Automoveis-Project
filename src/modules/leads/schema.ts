import { z } from "zod";

export const leadQuizSchema = z.object({
  budget: z.enum(["Até R$ 80k", "R$ 80k - 150k", "R$ 150k+"])
});

export const leadSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(10),
  consent: z.boolean(),
  quiz: leadQuizSchema,
  currentVehicle: z.string().optional().default("")
});

export type LeadInput = z.infer<typeof leadSchema>;
