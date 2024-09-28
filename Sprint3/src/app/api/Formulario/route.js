export async function POST(req) {
    const body = await req.json();

    console.log('Datos recibidos:', body);

    return new Response(JSON.stringify({ message: 'Mensaje recibido con éxito' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
