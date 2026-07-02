export const prerender = false;

import type { APIRoute } from 'astro';

// Brevo list "From the website" (strona internetowa)
const LIST_ID = 7;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = typeof data?.email === 'string' ? data.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400 });
    }

    const key = process.env.BREVO_API_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: 'Newsletter is not configured.' }), { status: 500 });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': key,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      // updateEnabled: true -> existing contacts are added to the list without a duplicate error
      body: JSON.stringify({ email, listIds: [LIST_ID], updateEnabled: true }),
    });

    if (res.status === 201 || res.status === 204) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const body = await res.json().catch(() => ({} as any));
    if (res.status === 400 && body?.code === 'duplicate_parameter') {
      // Already subscribed — treat as success
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Subscription failed. Please try again.' }), { status: 500 });
  } catch {
    return new Response(JSON.stringify({ error: 'Subscription failed. Please try again.' }), { status: 500 });
  }
};
