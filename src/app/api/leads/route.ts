import { NextResponse } from 'next/server';
import { leadQuizSchema } from '@/modules/leads/types/lead';
import { leadRateLimit } from '@/lib/rate-limit';
import { encrypt } from '@/lib/crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { normalizeWhatsapp } from '@/modules/leads/lib/whatsapp';
import { createHash } from 'crypto';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await leadRateLimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
  }

  const payload: unknown = await request.json();
  const parsed = leadQuizSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const normalizedWhatsapp = normalizeWhatsapp(parsed.data.whatsapp);
  const encryptedWhatsapp = encrypt(normalizedWhatsapp);
  const hash = createHash('sha256').update(normalizedWhatsapp).digest('hex');

  const existing = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('whatsapp_hash', hash)
    .maybeSingle();

  if (existing.data) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert({
      whatsapp_encrypted: encryptedWhatsapp,
      whatsapp_hash: hash,
      budget: parsed.data.budget,
      usage: parsed.data.usage,
      trade_in: parsed.data.tradeIn,
      consent: parsed.data.consent
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }

  await supabaseAdmin.from('lead_consents').insert({
    lead_id: data.id,
    consent_text: 'Lead quiz consent accepted'
  });

  return NextResponse.json({ ok: true });
}
