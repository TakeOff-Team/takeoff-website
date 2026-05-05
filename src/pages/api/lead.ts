import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, business, website, time } = data;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: phone || null,
        business: business || null,
        website: website || null,
        time_problem: time || null,
        source: 'takeoff-landing',
        status: 'submitted',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const notifyEmail = import.meta.env.NOTIFICATION_EMAIL || 'zach@takeoff.llc';

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      business ? `Business: ${business}` : null,
      website ? `Website: ${website}` : null,
      '',
      `What's eating their time:`,
      time || '(not provided)',
      '',
      `---`,
      `Lead ID: ${lead?.id || '(insert failed)'}`,
      `Source: takeoff-landing`,
    ].filter(Boolean).join('\n');

    await resend.emails.send({
      from: 'Takeoff <zach@takeoff.llc>',
      to: notifyEmail,
      subject: `New AI Assessment lead: ${name}${business ? ` (${business})` : ''}`,
      replyTo: email,
      text: lines,
    });

    return new Response(JSON.stringify({ success: true, leadId: lead?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Lead endpoint error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
