import db from '../config/db';


export async function apiGenerate(req: Request): Promise<Response> {
    try {
        
        const maxnum = 10000;

        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomRGBColor = () => {
            const r = getRandomNumber(0, 255);
            const g = getRandomNumber(0, 255);
            const b = getRandomNumber(0, 255);
            return `{${r},${g},${b}}`; 
        };

        for (let num = 1; num <= maxnum; num++) {
            const link = `https://randomurl.com/${num}`;
            const dataRow = {
                num: num,
                layer: getRandomNumber(1, 100),
                height: getRandomNumber(1, 300),
                width: getRandomNumber(1, 300),
                xAxis: getRandomNumber(0, 1200),
                yAxis: getRandomNumber(0, 800),
                borderWeight: getRandomNumber(1, 5),
                borderColor: getRandomRGBColor(),
                borderRadius: getRandomNumber(0, 50),
                link: link,
            };

            try {
                const query = `
                INSERT INTO style (
                    num, layer, height, width, xAxis, yAxis, borderWeight, borderColor, borderRadius, link
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                )
                `;
                await db.query(query, Object.values(dataRow));
            } catch (insertError) {
                console.error('Error inserting data:', insertError);
            }
        }
        
        return new Response(JSON.stringify({ 
            msg: `Successfully insert` 
        }), {
            status: 200,
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }
}
