import Link from 'next/link';
import { Hero } from '@/components/hero';
import { InventoryPreview } from '@/modules/inventory/components/inventory-preview';

export default function HomePage() {
  return (
    <main className="flex flex-col gap-12 px-6 py-10">
      <Hero />
      <InventoryPreview />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold">Pronto para encontrar seu próximo carro?</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Responda ao nosso quiz rápido e receba recomendações personalizadas em menos de um minuto.
        </p>
        <Link
          href="/leads/quiz"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Iniciar quiz
        </Link>
      </section>
    </main>
  );
}
