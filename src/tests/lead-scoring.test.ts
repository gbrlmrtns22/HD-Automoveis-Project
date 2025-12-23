import { scoreLead } from "@/modules/leads/scoring";

const baseLead = {
  name: "Ana",
  email: "ana@example.com",
  whatsapp: "+5511999999999",
  budget: 90000,
  condition: "new" as const,
  tradeIn: true,
  urgency: "30" as const,
  contactPreference: "whatsapp" as const
};

describe("scoreLead", () => {
  it("returns hot tier for strong leads", () => {
    const result = scoreLead(baseLead);
    expect(result.tier).toBe("hot");
    expect(result.score).toBeGreaterThanOrEqual(80);
  });
});
