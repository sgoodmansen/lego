// Test retrieving LEGO set information through Netlify
async function testLegoAPI() {
    try {
        const response = await fetch(
            ".netlify/functions/getLegoSet?set=42179-1"
        );

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log("LEGO set information", data);
    } catch (error) {
        console.error("Unable to retrieve LEGO set:", error);
    }
}

testLegoAPI();
