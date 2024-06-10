import db from '../config/db';

export async function apiGraphics(): Promise<Response> {
    try {
        const { rows } = await db.query('SELECT * FROM style');
        return new Response(JSON.stringify(rows), {
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }
}
