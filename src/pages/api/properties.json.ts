import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const location = url.searchParams.get('location');
  const apiKey = import.meta.env.REALTY_MOLE_API_KEY;

  if (!location || location.trim() === '') {
    return new Response(JSON.stringify({ error: 'Missing location parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestUrl = `https://realty-mole-property-api.p.rapidapi.com/rentalListings?location=${encodeURIComponent(location)}`;
  console.log('Request URL:', requestUrl);

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch property data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.length) {
      return new Response(JSON.stringify({ error: 'No rental properties found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const listings = data.map((rental: any) => ({
      title: rental.address,
      description: `Estimated Rent: $${rental.price} per month`,
      image: rental.image || 'https://via.placeholder.com/150',
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rental.address)}`,
    }));

    return new Response(JSON.stringify({ listings }), {
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
