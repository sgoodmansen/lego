// Retrieve LEGO set information from the Rebrickable API.
export default async function handler(request, context) {
    try {
        // Retrieve the API key from Netlify's environment variables.
        const apiKey = process.env.REBRICKABLE_API_KEY;

        if (!apiKey) {
            throw new Error("Rebrickable API key is missing.");
        }

        // Request the Millennium Falcon LEGO set.
        const url = "https://rebrickable.com/api/v3/lego/sets/75192-1/";

        const response = await fetch(url, {
            headers: {
                Authorization: `key ${apiKey}`
            }
        });

        // Check whether Rebrickable returned a successful response.
        if (!response.ok) {
            throw new Error(`Rebrickable API error: ${response.status}`);
        }

        // Convert the JSON response into a JavaScript object.
        const data = await response.json();

        // Return the LEGO set information to the browser.
        return Response.json(data);

    } catch (error) {
        console.error("LEGO API error:", error.message);

        return Response.json(
            { error: "Unable to retrieve LEGO set information." },
            { status: 500 }
        );
    }
}