import { SyncDashboard } from '@/modules/inventory/components/sync-dashboard';

export default function AdminPage() {
  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-semibold">Painel Admin</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Acompanhe o status de sincronização e ações recentes.
      </p>
      <div className="mt-8">
        <SyncDashboard />
      </div>
    </main>
  );
}
