import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const location = url.searchParams.get('location');
  const apiKey = import.meta.env.RENTCAST_API_KEY;

  if (!location || location.trim() === '') {
    return new Response(JSON.stringify({ error: 'Missing location parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestUrl = `https://api.rentcast.io/v1/rent-estimates?address=${encodeURIComponent(location)}`;
  console.log('Request URL:', requestUrl);

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'X-RentCast-API-Key': apiKey,
      },
    });

    if (response.status === 404) {
      throw new Error('No properties found for the given location.');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch property data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.rentals || data.rentals.length === 0) {
      throw new Error('No rental properties found.');
    }

    const listings = data.rentals.map((rental: any) => ({
      title: rental.address,
      description: `Estimated Rent: $${rental.rent} per month`,
      image: rental.image_url || 'https://via.placeholder.com/150',
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
