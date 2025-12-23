import { env } from "@/lib/env";
import { LiveAutoCertoProvider } from "@/modules/inventory/providers/autocerto/live";
import { MockAutoCertoProvider } from "@/modules/inventory/providers/autocerto/mock";
import type { AutoCertoProvider } from "@/modules/inventory/providers/autocerto/provider";

export const createAutoCertoProvider = (): AutoCertoProvider => {
  if (env.AUTOCERTO_MODE === "live") {
    return new LiveAutoCertoProvider();
  }
  return new MockAutoCertoProvider();
};
