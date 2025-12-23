import { LeadQuizForm } from "@/modules/leads/components/LeadQuizForm";

export default function LeadsPage() {
  return (
    <main className="container py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Lead quiz</h1>
        <p className="text-sm text-slate-600">
          Responda em menos de 60 segundos para receber atendimento personalizado.
        </p>
      </header>
      <LeadQuizForm />
    </main>
  );
}
