import { describe, expect, it } from 'vitest';
import { scoreLead } from '@/modules/leads/lib/scoring';

describe('scoreLead', () => {
  it('returns high tier for high budget and usage', () => {
    const result = scoreLead({
      budget: '200k+',
      usage: 'viagem',
      tradeIn: 'sim',
      whatsapp: '+5511999990000',
      consent: true
    });

    expect(result.tier).toBe('alto');
  });
});
