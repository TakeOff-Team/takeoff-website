import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import crypto from 'node:crypto';
import ws from 'ws';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-cal-signature-256');
    const secret = import.meta.env.CAL_WEBHOOK_SECRET;

    if (secret) {
      const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
      if (signature !== expected) {
        console.warn('Cal webhook signature mismatch');
        return new Response('Invalid signature', { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);
    const triggerEvent: string = event.triggerEvent;
    const payload = event.payload || {};

    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
      { realtime: { transport: ws as any } }
    );

    const attendeeEmail: string | undefined = payload.attendees?.[0]?.email;
    const eventUid: string | undefined = payload.uid;
    const startTime: string | undefined = payload.startTime;

    if (triggerEvent === 'BOOKING_CREATED') {
      if (!attendeeEmail) return new Response('No attendee email', { status: 200 });

      const { data: leads } = await supabase
        .from('leads')
        .select('id')
        .eq('email', attendeeEmail)
        .eq('status', 'submitted')
        .order('created_at', { ascending: false })
        .limit(1);

      if (leads?.[0]) {
        await supabase
          .from('leads')
          .update({
            status: 'booked',
            cal_event_uid: eventUid,
            cal_booked_at: new Date().toISOString(),
            cal_event_start: startTime,
          })
          .eq('id', leads[0].id);
      } else {
        // Lead booked from a channel that bypassed our form (direct cal.com link).
        // Insert a stub row so we still capture them in the CRM.
        await supabase.from('leads').insert({
          name: payload.attendees?.[0]?.name || attendeeEmail,
          email: attendeeEmail,
          source: 'cal-direct',
          status: 'booked',
          cal_event_uid: eventUid,
          cal_booked_at: new Date().toISOString(),
          cal_event_start: startTime,
        });
      }
    } else if (triggerEvent === 'BOOKING_CANCELLED' && eventUid) {
      await supabase
        .from('leads')
        .update({
          status: 'cancelled',
          cal_cancelled_at: new Date().toISOString(),
        })
        .eq('cal_event_uid', eventUid);
    } else if (triggerEvent === 'BOOKING_RESCHEDULED' && eventUid) {
      await supabase
        .from('leads')
        .update({ cal_event_start: startTime })
        .eq('cal_event_uid', eventUid);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Cal webhook error:', err);
    return new Response('Error', { status: 500 });
  }
};
