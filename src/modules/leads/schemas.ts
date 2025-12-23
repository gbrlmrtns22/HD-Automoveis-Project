import { z } from "zod";

export const leadQuizSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(8),
  budget: z.number().min(5000),
  condition: z.enum(["new", "used"]),
  tradeIn: z.boolean(),
  urgency: z.enum(["30", "90", "later"]),
  contactPreference: z.enum(["whatsapp", "email"])
});

export type LeadQuizInput = z.infer<typeof leadQuizSchema>;
