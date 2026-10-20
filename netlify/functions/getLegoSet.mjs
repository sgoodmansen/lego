// Test a server-side Netlify Function.
export default async function handler(request, context) {
    return new Response(
        JSON.stringify({
            message: "Brick Archive API function is working!"
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}