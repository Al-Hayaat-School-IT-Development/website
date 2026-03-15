import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createDonation } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text(); // RAW body — do not use req.json()
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('[webhook] Missing stripe-signature header — ERR_STRIPE_INVALID_SIGNATURE');
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not configured — ERR_WEBHOOK_SECRET_MISSING');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook] Signature verification failed — ERR_STRIPE_INVALID_SIGNATURE:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const isAnonymous = session.metadata?.isAnonymous === 'true';
      const donation = await createDonation({
        stripeSessionId: session.id,
        amountCad: (session.amount_total ?? 0) / 100,
        donorName: isAnonymous ? null : (session.metadata?.donorName ?? null),
        donorEmail: session.metadata?.donorEmail ?? session.customer_email ?? '',
        donorAddress: session.metadata?.donorAddress || undefined,
        isAnonymous,
      });

      if (donation) {
        console.log(`[webhook] Donation recorded: ${donation.id} — $${donation.amountCad} CAD`);
      } else {
        // ON CONFLICT DO NOTHING — duplicate event, silently ignore
        console.log(`[webhook] Duplicate event ignored: ${session.id}`);
      }
    } catch (err) {
      // Return 500 so Stripe retries
      console.error('[webhook] DB write failed — ERR_DB_WRITE_FAILED:', err, { sessionId: session.id });
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
