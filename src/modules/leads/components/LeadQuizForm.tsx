"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadQuizSchema, type LeadQuizInput } from "../schemas";
import { useEffect, useState } from "react";

export const LeadQuizForm = () => {
  const [status, setStatus] = useState<string | null>(null);
  const storageKey = "hd-lead-quiz";
  const form = useForm<LeadQuizInput>({
    resolver: zodResolver(leadQuizSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      budget: 40000,
      condition: "used",
      tradeIn: false,
      urgency: "90",
      contactPreference: "whatsapp"
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = leadQuizSchema.safeParse(JSON.parse(stored));
      if (parsed.success) {
        form.reset(parsed.data);
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const parsed = leadQuizSchema.safeParse(values);
      if (parsed.success) {
        localStorage.setItem(storageKey, JSON.stringify(parsed.data));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: LeadQuizInput) => {
    setStatus("Enviando...");
    const response = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("Não foi possível enviar. Tente novamente.");
      return;
    }

    const data = await response.json();
    setStatus(`Recebido! Score ${data.score} (${data.tier}).`);
    form.reset();
    localStorage.removeItem(storageKey);
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm font-medium">Nome</label>
        <input className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("name")} />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("email")} />
      </div>
      <div>
        <label className="text-sm font-medium">WhatsApp</label>
        <input className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("whatsapp")} />
      </div>
      <div>
        <label className="text-sm font-medium">Orçamento</label>
        <input
          type="number"
          className="mt-1 w-full rounded-lg border border-slate-200 p-2"
          {...form.register("budget", { valueAsNumber: true })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Condição</label>
          <select className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("condition")}>
            <option value="new">Novo</option>
            <option value="used">Seminovo</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Preferência de contato</label>
          <select className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("contactPreference")}>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Troca</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            {...form.register("tradeIn", { setValueAs: (value) => value === "true" })}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Urgência</label>
          <select className="mt-1 w-full rounded-lg border border-slate-200 p-2" {...form.register("urgency")}>
            <option value="30">Até 30 dias</option>
            <option value="90">Até 90 dias</option>
            <option value="later">Mais de 90 dias</option>
          </select>
        </div>
      </div>
      <button type="submit" className="rounded-full bg-primary px-5 py-2 text-white">
        Enviar
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
};
