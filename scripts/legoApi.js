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

    const resultsContainer = document.querySelector("#api-results");

    resultsContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p>Set Number: ${data.set_num}</p>
        <p>Year: ${data.year}</p>
        <p>Pieces: ${data.num_parts}</p>
    `;
    
    const setImage = document.createElement("img");

    setImage.src = data.set_img_url;
    setImage.alt = data.name;

    resultsContainer.appendChild(setImage);

    } catch (error) {
        console.error("Unable to retrieve LEGO set:", error);
    }
}

testLegoAPI();
