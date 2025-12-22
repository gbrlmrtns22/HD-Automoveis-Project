'use client';

import { useState } from 'react';
import { mockAutoCertoProvider } from '../providers/autocerto/mock';
import { runInventorySync } from '../sync/engine';

export function SyncDashboard() {
  const [status, setStatus] = useState('Idle');
  const [logs, setLogs] = useState<Array<{ level: string; message: string }>>([]);

  const handleSync = async () => {
    setStatus('Sincronizando...');
    const result = await runInventorySync(mockAutoCertoProvider, async () => Promise.resolve());
    setLogs(result.logs);
    setStatus(`Concluído: ${result.synced}/${result.total}`);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sync AutoCerto</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Status: {status}</p>
        </div>
        <button
          onClick={handleSync}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Rodar sync
        </button>
      </div>
      <div className="space-y-2 text-sm">
        {logs.length === 0 && <p className="text-slate-500">Nenhum log disponível.</p>}
        {logs.map((log, index) => (
          <p key={index} className={log.level === 'error' ? 'text-error' : 'text-success'}>
            {log.message}
          </p>
        ))}
      </div>
    </section>
  );
}
