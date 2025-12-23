import type { LeadInput } from "@/modules/leads/schema";

export type LeadRecord = LeadInput & { id: string; score: number; createdAt: string };

const leads: LeadRecord[] = [];

export const inMemoryLeadStore = {
  add(lead: LeadRecord) {
    leads.unshift(lead);
  },
  findByWhatsapp(whatsapp: string) {
    return leads.find((lead) => lead.whatsapp === whatsapp);
  },
  list() {
    return leads;
  }
};
