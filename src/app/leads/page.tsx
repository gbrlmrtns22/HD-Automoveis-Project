import { SiteHeader } from "@/components/site-header";
import { LeadQuiz } from "@/modules/leads/components/lead-quiz";

export default function LeadsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <LeadQuiz />
      </main>
    </div>
  );
}
