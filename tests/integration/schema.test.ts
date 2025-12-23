import { describe, expect, it } from "vitest";
import { leadSchema } from "@/modules/leads/schema";

describe("schemas", () => {
  it("validates lead payload", () => {
    const parsed = leadSchema.parse({
      name: "Maria",
      whatsapp: "11999990000",
      consent: true,
      quiz: { budget: "R$ 80k - 150k" },
      currentVehicle: ""
    });
    expect(parsed.name).toBe("Maria");
  });
});
