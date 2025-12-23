import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const SiteHeader = () => (
  <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="text-lg font-semibold text-brand-700">
        HD Automóveis
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/catalogo" className="hover:text-brand-600">Catálogo</Link>
        <Link href="/leads" className="hover:text-brand-600">Lead Express</Link>
        <Link href="/admin" className="hover:text-brand-600">Admin</Link>
        <Button asChild variant="outline" size="sm">
          <Link href="/catalogo">Ver veículos</Link>
        </Button>
        <ThemeToggle />
      </nav>
    </div>
  </header>
);
