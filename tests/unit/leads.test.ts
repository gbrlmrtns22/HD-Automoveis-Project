import { describe, expect, it } from "vitest";
import { normalizeWhatsapp, scoreLead } from "@/modules/leads/scoring";

describe("lead scoring", () => {
  it("normalizes whatsapp to E.164", () => {
    expect(normalizeWhatsapp("(11) 99999-0000")).toBe("+5511999990000");
  });

  it("scores lead based on budget and consent", () => {
    const score = scoreLead({
      name: "Ana",
      whatsapp: "11999990000",
      consent: true,
      quiz: { budget: "R$ 150k+" },
      currentVehicle: "Onix"
    });
    expect(score).toBe(65);
  });
});
