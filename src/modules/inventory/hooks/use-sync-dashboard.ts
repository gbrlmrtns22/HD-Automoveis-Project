"use client";

import { useQuery } from "@tanstack/react-query";

export type SyncRun = {
  id: string;
  startedAt: string;
  finishedAt?: string;
  status: "running" | "success" | "partial" | "failed";
  totalProcessed: number;
  totalFailed: number;
};

export type SyncLog = {
  id: string;
  runId: string;
  level: "info" | "warn" | "error";
  message: string;
  payload?: Record<string, string | number | boolean>;
  createdAt: string;
};

export type AuditEntry = {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
};

export const useSyncDashboard = () =>
  useQuery({
    queryKey: ["sync-dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/inventory/sync");
      return (await response.json()) as { runs: SyncRun[]; logs: SyncLog[]; audit: AuditEntry[] };
    }
  });
