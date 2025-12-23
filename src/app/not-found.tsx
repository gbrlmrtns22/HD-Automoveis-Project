import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <p className="text-sm text-slate-500">Verifique o endereço ou volte ao início.</p>
      <Button asChild>
        <Link href="/">Voltar</Link>
      </Button>
    </div>
  );
}
