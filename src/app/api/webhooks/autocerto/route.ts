import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { createHmac } from 'crypto';

export async function POST(request: Request) {
  const signature = request.headers.get('x-autocerto-signature');
  const body = await request.text();
  const expected = createHmac('sha256', env.AUTOCERTO_HMAC_SECRET)
    .update(body)
    .digest('hex');

  if (signature !== expected) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  return NextResponse.json({ received: true });
}
