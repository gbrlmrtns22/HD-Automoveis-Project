import type { LeadInput } from "@/modules/leads/schema";

export const normalizeWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("55")) {
    return `+${digits}`;
  }
  return `+55${digits}`;
};

export const scoreLead = (lead: LeadInput) => {
  let score = 0;
  if (lead.quiz.budget === "R$ 150k+") {
    score += 50;
  } else if (lead.quiz.budget === "R$ 80k - 150k") {
    score += 35;
  } else {
    score += 20;
  }
  if (lead.currentVehicle?.length) {
    score += 10;
  }
  if (lead.consent) {
    score += 5;
  }
  return score;
};
