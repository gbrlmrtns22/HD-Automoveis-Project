import { supabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = supabaseServerClient();
  const { data: runs } = await supabase
    .from("sync_runs")
    .select("id, status, processed, created, updated, errors, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="container py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <p className="text-sm text-slate-600">Monitor sync health and recent runs.</p>
      </header>
      <section className="rounded-2xl bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Latest sync runs</h2>
        <ul className="mt-4 space-y-3">
          {runs?.map((run) => (
            <li key={run.id} className="flex flex-col gap-1 border-b border-slate-100 pb-3 text-sm">
              <span className="font-medium">Run {run.id}</span>
              <span>Status: {run.status}</span>
              <span>
                Processed {run.processed} · Created {run.created} · Updated {run.updated} · Errors {run.errors}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
