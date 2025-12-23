"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body className="container py-16">
        <h1 className="text-2xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-sm text-slate-600">Tente novamente ou contate o suporte.</p>
        <button className="mt-4 rounded-full bg-primary px-5 py-2 text-white" onClick={() => reset()}>
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
