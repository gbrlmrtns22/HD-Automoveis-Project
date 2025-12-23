import type { LeadQuizInput } from "./schemas";

export type LeadTier = "hot" | "warm" | "cool";

export const normalizeWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("55") ? `+${digits}` : `+55${digits}`;
};

export const scoreLead = (input: LeadQuizInput): { score: number; tier: LeadTier } => {
  let score = 0;

  if (input.budget >= 80000) score += 30;
  else if (input.budget >= 40000) score += 20;
  else score += 10;

  score += input.condition === "new" ? 25 : 15;
  score += input.contactPreference === "whatsapp" ? 15 : 10;
  score += input.tradeIn ? 10 : 0;

  if (input.urgency === "30") score += 20;
  else if (input.urgency === "90") score += 10;
  else score += 5;

  const tier: LeadTier = score >= 80 ? "hot" : score >= 50 ? "warm" : "cool";
  return { score, tier };
};
