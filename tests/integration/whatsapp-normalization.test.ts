import { describe, expect, it } from 'vitest';
import { normalizeWhatsapp } from '@/modules/leads/lib/whatsapp';

describe('normalizeWhatsapp', () => {
  it('adds country code when missing', () => {
    expect(normalizeWhatsapp('(11) 99999-0000')).toBe('+5511999990000');
  });
});
