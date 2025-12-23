import { describe, expect, it } from "vitest";
import { runInventorySync } from "@/modules/inventory/sync/engine";
import { inMemoryInventoryStore } from "@/modules/inventory/sync/store";

describe("inventory sync", () => {
  it("stores vehicles in memory", async () => {
    await runInventorySync();
    const vehicles = inMemoryInventoryStore.getVehicles();
    expect(vehicles.length).toBeGreaterThan(0);
  });
});
