export type LeadEvent = {
  id: string;
  type: "lead.created" | "lead.duplicate";
  payload: Record<string, string | number | boolean>;
  createdAt: string;
};

const events: LeadEvent[] = [];

export const inMemoryLeadEvents = {
  add(event: LeadEvent) {
    events.unshift(event);
  },
  list() {
    return events;
  }
};
