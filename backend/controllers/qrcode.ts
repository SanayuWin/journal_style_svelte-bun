import db from '../config/db';

export async function apiQRCode(): Promise<Response> {
    try {
        const result = await db.query('SELECT link FROM style ORDER BY RANDOM() LIMIT 1');
        const urlData = result.rows[0].link; 
        const encoded = btoa(urlData);
        return new Response(JSON.stringify({ 
            msg: encoded 
        }), {
            status: 200,
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
