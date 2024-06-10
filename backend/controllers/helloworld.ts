
export async function apiHelloWorld(): Promise<Response> {
    try {
        return new Response(JSON.stringify({ 
            msg: `Hello World` 
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
