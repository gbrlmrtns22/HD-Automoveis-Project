export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      vehicles: { Row: Record<string, unknown> };
      vehicle_images: { Row: Record<string, unknown> };
      leads: { Row: Record<string, unknown> };
      lead_quiz_responses: { Row: Record<string, unknown> };
      lead_consents: { Row: Record<string, unknown> };
      lead_events: { Row: Record<string, unknown> };
      sync_runs: { Row: Record<string, unknown> };
      sync_logs: { Row: Record<string, unknown> };
      admin_audit_log: { Row: Record<string, unknown> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
