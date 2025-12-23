import { SiteHeader } from "@/components/site-header";
import { SyncDashboard } from "@/modules/admin/components/sync-dashboard";

export default function AdminPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Painel administrativo</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Acesso restrito a administradores com logs e operações em massa.
        </p>
        <div className="mt-8">
          <SyncDashboard />
        </div>
      </main>
    </div>
  );
}
