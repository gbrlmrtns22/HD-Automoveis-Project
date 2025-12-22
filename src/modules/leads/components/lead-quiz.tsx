'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadQuizSchema, type LeadQuizInput } from '@/modules/leads/types/lead';
import { scoreLead } from '@/modules/leads/lib/scoring';
import { normalizeWhatsapp } from '@/modules/leads/lib/whatsapp';

const STORAGE_KEY = 'hd-automoveis-lead-quiz';

const steps: Array<keyof LeadQuizInput> = [
  'budget',
  'usage',
  'tradeIn',
  'whatsapp',
  'consent'
];

export function LeadQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const form = useForm<LeadQuizInput>({
    resolver: zodResolver(leadQuizSchema),
    defaultValues: {
      budget: '50-100k',
      usage: 'urbano',
      tradeIn: 'nao',
      whatsapp: '',
      consent: false
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = leadQuizSchema.safeParse(JSON.parse(saved));
      if (parsed.success) {
        form.reset(parsed.data);
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const progress = useMemo(() => Math.round(((stepIndex + 1) / steps.length) * 100), [stepIndex]);

  const handleNext = async () => {
    if (step) {
      const valid = await form.trigger(step);
      if (!valid) return;
    }
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const onSubmit = (values: LeadQuizInput) => {
    const normalized = {
      ...values,
      whatsapp: normalizeWhatsapp(values.whatsapp)
    };
    const scored = scoreLead(normalized);
    localStorage.removeItem(STORAGE_KEY);
    alert(`Lead enviado! Score: ${scored.score} (${scored.tier})`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Quiz rápido</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Complete em menos de 60s.</p>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-2 rounded-full bg-brand-600" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {step === 'budget' && (
        <fieldset className="space-y-2">
          <legend className="font-medium">Qual seu orçamento?</legend>
          {['até-50k', '50-100k', '100-200k', '200k+'].map((value) => (
            <label key={value} className="flex items-center gap-2">
              <input type="radio" value={value} {...form.register('budget')} />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
      )}

      {step === 'usage' && (
        <fieldset className="space-y-2">
          <legend className="font-medium">Principal uso?</legend>
          {['urbano', 'familia', 'viagem', 'trabalho'].map((value) => (
            <label key={value} className="flex items-center gap-2">
              <input type="radio" value={value} {...form.register('usage')} />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
      )}

      {step === 'tradeIn' && (
        <fieldset className="space-y-2">
          <legend className="font-medium">Tem veículo para troca?</legend>
          {['sim', 'nao'].map((value) => (
            <label key={value} className="flex items-center gap-2">
              <input type="radio" value={value} {...form.register('tradeIn')} />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
      )}

      {step === 'whatsapp' && (
        <label className="block">
          <span className="text-sm font-medium">WhatsApp</span>
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent p-3"
            placeholder="+55 11 99999-0000"
            {...form.register('whatsapp')}
          />
        </label>
      )}

      {step === 'consent' && (
        <label className="flex items-start gap-2">
          <input type="checkbox" {...form.register('consent')} />
          <span className="text-sm">
            Concordo em receber contato da HD Automóveis e aceito a política de privacidade.
          </span>
        </label>
      )}

      <footer className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm"
        >
          Voltar
        </button>
        {stepIndex === steps.length - 1 ? (
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Enviar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Próximo
          </button>
        )}
      </footer>
    </form>
  );
}
