import { getMockVehicles } from '@/modules/inventory/providers/autocerto/mock';

export default function InventoryPage() {
  const vehicles = getMockVehicles();

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-semibold">Estoque disponível</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Veículos publicados e sincronizados em tempo real.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <h2 className="mt-4 text-lg font-semibold">{vehicle.model}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">{vehicle.brand}</p>
            <p className="mt-2 font-semibold text-brand-600">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
