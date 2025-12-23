import { SiteHeader } from "@/components/site-header";
import { VehicleGrid } from "@/modules/inventory/components/vehicle-grid";

export default function CatalogPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Catálogo de veículos</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Busque pelo seu próximo veículo com atualização em tempo real.
        </p>
        <VehicleGrid />
      </main>
    </div>
  );
}
