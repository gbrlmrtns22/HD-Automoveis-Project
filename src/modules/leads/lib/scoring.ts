import type { LeadQuizInput, LeadScore } from '@/modules/leads/types/lead';

const budgetWeights: Record<LeadQuizInput['budget'], number> = {
  'até-50k': 10,
  '50-100k': 20,
  '100-200k': 30,
  '200k+': 40
};

const usageWeights: Record<LeadQuizInput['usage'], number> = {
  urbano: 15,
  familia: 20,
  viagem: 25,
  trabalho: 10
};

const tradeInWeights: Record<LeadQuizInput['tradeIn'], number> = {
  sim: 10,
  nao: 5
};

export function scoreLead(input: LeadQuizInput): LeadScore {
  const rawScore =
    budgetWeights[input.budget] +
    usageWeights[input.usage] +
    tradeInWeights[input.tradeIn] +
    10;
  const score = Math.min(100, rawScore);
  const tier = score >= 70 ? 'alto' : score >= 40 ? 'medio' : 'baixo';

  return { score, tier };
}
