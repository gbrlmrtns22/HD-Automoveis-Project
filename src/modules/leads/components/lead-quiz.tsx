"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadInput } from "@/modules/leads/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "lead-quiz";

export const LeadQuiz = () => {
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      consent: false,
      quiz: { budget: "Até R$ 80k" },
      currentVehicle: ""
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as LeadInput;
      form.reset(parsed);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      localStorage.removeItem(STORAGE_KEY);
      form.reset();
      alert("Recebemos seus dados! Nossa equipe entrará em contato.");
    } else {
      alert("Não foi possível enviar. Tente novamente.");
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead express em 60s</CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">Preencha e receba ofertas personalizadas.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-sm font-medium">Nome completo</span>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              {...form.register("name")}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">WhatsApp</span>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              {...form.register("whatsapp")}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Orçamento</span>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              {...form.register("quiz.budget")}
            >
              <option>Até R$ 80k</option>
              <option>R$ 80k - 150k</option>
              <option>R$ 150k+</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Carro atual</span>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              {...form.register("currentVehicle")}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4" {...form.register("consent")} />
            Concordo em receber contato e políticas LGPD.
          </label>
          <Button type="submit" className="w-full">Enviar</Button>
        </form>
      </CardContent>
    </Card>
  );
};
