"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSyncDashboard } from "@/modules/inventory/hooks/use-sync-dashboard";

export const SyncDashboard = () => {
  const { data, refetch, isFetching } = useSyncDashboard();

  const triggerSync = async () => {
    await fetch("/api/inventory/sync", { method: "POST" });
    refetch();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sincronização AutoCerto</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400">Dispare uma nova sincronização e acompanhe o status.</p>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Button onClick={triggerSync} disabled={isFetching}>
            {isFetching ? "Sincronizando..." : "Sincronizar agora"}
          </Button>
          <span className="text-sm text-slate-500">Últimas execuções: {data?.runs.length ?? 0}</span>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Execuções</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.runs.map((run) => (
              <div key={run.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{run.status}</span>
                  <span>{new Date(run.startedAt).toLocaleString("pt-BR")}</span>
                </div>
                <div className="mt-2 text-slate-500">
                  {run.totalProcessed} processados • {run.totalFailed} falhas
                </div>
              </div>
            )) ?? <p className="text-sm text-slate-500">Sem execuções recentes.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.logs.map((log) => (
              <div key={log.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{log.level.toUpperCase()}</span>
                  <span>{new Date(log.createdAt).toLocaleTimeString("pt-BR")}</span>
                </div>
                <p className="mt-2 text-slate-500">{log.message}</p>
              </div>
            )) ?? <p className="text-sm text-slate-500">Sem logs recentes.</p>}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Audit log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.audit.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-medium">{entry.action}</span>
                <span>{new Date(entry.createdAt).toLocaleString("pt-BR")}</span>
              </div>
              <p className="mt-2 text-slate-500">Actor: {entry.actor}</p>
            </div>
          )) ?? <p className="text-sm text-slate-500">Sem ações registradas.</p>}
        </CardContent>
      </Card>
    </div>
  );
};
