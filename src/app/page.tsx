import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Plataforma SaaS</p>
            <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
              HD Automóveis: gestão moderna para concessionárias conectadas.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Catálogo em tempo real, lead scoring inteligente e painel administrativo completo com
              sincronização AutoCerto e auditoria LGPD.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/catalogo">Explorar catálogo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/leads">Iniciar lead express</Link>
              </Button>
            </div>
          </div>
          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Indicadores em tempo real</h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>• Sync bidirecional com AutoCerto + logs detalhados.</li>
                <li>• Leads deduplicados por WhatsApp com scoring automático.</li>
                <li>• Admin com auditoria e operações em massa.</li>
              </ul>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
