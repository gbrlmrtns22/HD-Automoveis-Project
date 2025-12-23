"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold">Ops! Algo deu errado.</h2>
      <p className="text-sm text-slate-500">Tente novamente ou volte mais tarde.</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
