import { createHmac } from "node:crypto";
import { env } from "@/lib/env";
import { autoCertoSyncCursorSchema, autoCertoVehicleSchema } from "@/modules/inventory/providers/autocerto/types";
import type { AutoCertoProvider, AutoCertoSyncResult } from "@/modules/inventory/providers/autocerto/provider";

export class LiveAutoCertoProvider implements AutoCertoProvider {
  name = "live";

  async fetchVehicles(cursor: string | null): Promise<AutoCertoSyncResult> {
    if (!env.AUTOCERTO_API_URL || !env.AUTOCERTO_API_KEY) {
      return { vehicles: [], cursor: { cursor: null, hasMore: false } };
    }
    const url = new URL("/vehicles", env.AUTOCERTO_API_URL);
    if (cursor) {
      url.searchParams.set("cursor", cursor);
    }
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${env.AUTOCERTO_API_KEY}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 0 }
    });
    const data = await response.json();
    const vehicles = autoCertoVehicleSchema.array().parse(data.vehicles ?? []);
    const syncCursor = autoCertoSyncCursorSchema.parse(data.cursor ?? { cursor: null, hasMore: false });
    return { vehicles, cursor: syncCursor };
  }

  async fetchVehicleById(id: string) {
    if (!env.AUTOCERTO_API_URL || !env.AUTOCERTO_API_KEY) {
      return null;
    }
    const url = new URL(`/vehicles/${id}`, env.AUTOCERTO_API_URL);
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${env.AUTOCERTO_API_KEY}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 0 }
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return autoCertoVehicleSchema.parse(data);
  }

  verifyWebhook(signature: string | null, payload: string): boolean {
    if (!signature || !env.AUTOCERTO_WEBHOOK_SECRET) {
      return false;
    }
    const expected = createHmac("sha256", env.AUTOCERTO_WEBHOOK_SECRET).update(payload).digest("hex");
    return signature === expected;
  }
}
