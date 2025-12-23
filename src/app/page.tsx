export default function HomePage() {
  return (
    <main className="container py-16 space-y-12">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-primary">HD Automóveis</p>
        <h1 className="text-4xl font-semibold">Modern car dealership platform</h1>
        <p className="text-lg text-slate-600">
          Inventory sync, lead qualification, and real-time admin analytics for high-performing dealerships.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className="rounded-full bg-primary px-5 py-2 text-white" href="/inventory">
            View inventory
          </a>
          <a className="rounded-full border border-slate-200 px-5 py-2" href="/admin">
            Admin dashboard
          </a>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Realtime inventory",
            description: "Sync vehicles with AutoCerto and keep pricing consistent across channels."
          },
          {
            title: "Lead intelligence",
            description: "Quiz-driven lead scoring with WhatsApp-first engagement workflows."
          },
          {
            title: "Operational control",
            description: "Monitor sync health, manage listings, and audit every admin action."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-card p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
