import Link from 'next/link';
import { getMockVehicles } from '@/modules/inventory/providers/autocerto/mock';

export function InventoryPreview() {
  const vehicles = getMockVehicles().slice(0, 3);

  return (
    <section className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Destaques do estoque</h2>
        <Link className="text-sm font-semibold text-brand-600" href="/inventory">
          Ver catálogo completo
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <h3 className="mt-4 text-lg font-semibold">{vehicle.model}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-300">{vehicle.brand}</p>
            <p className="mt-2 text-brand-600">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
