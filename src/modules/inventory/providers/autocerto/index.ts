import { env } from "@/lib/env";
import type { AutoCertoProvider } from "./provider";
import { MockAutoCertoProvider } from "./mock";

export const autocertoProvider = (): AutoCertoProvider => {
  if (env.AUTOCERTO_MODE === "mock") {
    return new MockAutoCertoProvider();
  }

  return new MockAutoCertoProvider();
};
