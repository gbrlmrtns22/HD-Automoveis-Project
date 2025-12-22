import { describe, expect, it } from 'vitest';
import { runInventorySync } from '@/modules/inventory/sync/engine';
import { mockAutoCertoProvider } from '@/modules/inventory/providers/autocerto/mock';

describe('runInventorySync', () => {
  it('syncs vehicles', async () => {
    const result = await runInventorySync(mockAutoCertoProvider, async () => Promise.resolve());
    expect(result.total).toBeGreaterThan(0);
    expect(result.failed).toBe(0);
  });
});
