import { z } from 'zod';

export const leadQuizSchema = z.object({
  budget: z.enum(['até-50k', '50-100k', '100-200k', '200k+']),
  usage: z.enum(['urbano', 'familia', 'viagem', 'trabalho']),
  tradeIn: z.enum(['sim', 'nao']),
  whatsapp: z.string().min(10),
  consent: z.boolean()
});

export type LeadQuizInput = z.infer<typeof leadQuizSchema>;

export const leadScoreSchema = z.object({
  score: z.number().min(0).max(100),
  tier: z.enum(['alto', 'medio', 'baixo'])
});

export type LeadScore = z.infer<typeof leadScoreSchema>;
