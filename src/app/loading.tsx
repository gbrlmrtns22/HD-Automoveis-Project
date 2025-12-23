export default function Loading() {
  return (
    <div className="container py-16">
      <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
