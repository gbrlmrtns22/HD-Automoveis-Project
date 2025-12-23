import { supabaseServerClient } from "@/lib/supabase/server";

export default async function InventoryPage() {
  const supabase = supabaseServerClient();
  const { data } = await supabase
    .from("vehicles")
    .select("id, title, price, available")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="container py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Vehicle catalog</h1>
        <p className="text-sm text-slate-600">Browse our curated inventory.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {data?.map((vehicle) => (
          <article key={vehicle.id} className="rounded-2xl bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{vehicle.title}</h2>
            <p className="mt-1 text-sm text-slate-600">R$ {vehicle.price.toLocaleString("pt-BR")}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-primary">
              {vehicle.available ? "Disponível" : "Indisponível"}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
