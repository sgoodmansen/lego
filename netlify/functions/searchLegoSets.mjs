export default async function handler(request) {    
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search")?.trim();

    // Prevent empty searches from reaching Rebrickable
    if (!searchTerm) {
        return new Response(
            JSON.stringify({ error: "Please enter a LEGO set search term."}),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    console.log("Searching for: ", searchTerm);

    try {
        const apiKey = process.env.REBRICKABLE_API_KEY;

        // IF APIKEY is not set - change status to 500
        if (!apiKey) {
            console.error("Missing Rebrickable API key.");

            return new Response(
                JSON.stringify({ error: "Server configuration error." }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        const rebrickableURL = new URL(
            "https://rebrickable.com/api/v3/lego/sets/"
        );

        rebrickableURL.searchParams.set("search", searchTerm);
        rebrickableURL.searchParams.set("page_size", "20");

        const response = await fetch(rebrickableURL, {
            headers: {
                Authorization: `key ${apiKey}`
            }
        });

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Unable to search LEGO sets." }),
                {
                    status: response.status,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Rebrickable search failed: ", error);

        return new Response(
            JSON.stringify({ error: "Unable to complete LEGO set search." }),
            {
                status:502,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}