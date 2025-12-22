import Link from 'next/link';

export function Hero() {
  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-white shadow-lg">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-100">HD Automóveis</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Plataforma moderna para gestão e venda de veículos.
        </h1>
        <p className="mt-4 text-lg text-brand-100">
          Catálogo em tempo real, leads qualificados e sincronização automática com parceiros.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/inventory"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700"
        >
          Explorar estoque
        </Link>
        <Link
          href="/admin"
          className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white"
        >
          Acessar admin
        </Link>
      </div>
    </section>
  );
}
