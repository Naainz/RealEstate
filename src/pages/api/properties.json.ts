import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const city = url.searchParams.get('city');
  const state = url.searchParams.get('state');
  const apiKey = import.meta.env.OPENAI_API_KEY;

  if (!city || !state) {
    return new Response(JSON.stringify({ error: 'Missing city or state parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const prompt = `Generate 3 street names with property descriptions in ${city}, ${state}. The output should be formatted as 'Title -- Description'. Separate each entry with '---'.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ output: generatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
