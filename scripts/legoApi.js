// retrieve the form and input elements from explore.html
const searchForm = document.querySelector("#api-search-form");
const setNumberInput = document.querySelector("#set-number");

// locate submit button inside search form
const searchButton = searchForm.querySelector('button[type="submit"]');

// Test retrieving LEGO set information through Netlify
async function testLegoAPI(setNumber) {
    const resultsContainer = document.querySelector("#api-results");

    resultsContainer.classList.remove("api-set-card");
    resultsContainer.textContent = "Searching for LEGO set...";

    // Disable the search button while request is running
    searchButton.disabled = true;

    try {
        const response = await fetch(
            `/.netlify/functions/getLegoSet?set=${encodeURIComponent(setNumber)}`
        );

    // Handle unsuccessful API requests
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("LEGO set not found. Please check the set number.");
        }

        throw new Error("Unable to retrieve LEGO set information.");
    }

    const data = await response.json();

    console.log("LEGO set information", data);

    resultsContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p>Set Number: ${data.set_num.split("-")[0]}</p>
        <p>Year: ${data.year}</p>
        <p>Pieces: ${data.num_parts}</p>
    `;
    
    const setImage = document.createElement("img");
    resultsContainer.classList.add("api-set-card");
    setImage.classList.add("api-set-image");

    setImage.src = data.set_img_url;
    setImage.alt = data.name;

    resultsContainer.appendChild(setImage);

    } catch (error) {
        console.error("Unable to retrieve LEGO set:", error);

        resultsContainer.classList.remove("api-set-card");
        resultsContainer.replaceChildren();

        const errorMessage = document.createElement("p");
        errorMessage.textContent = error.message;

        resultsContainer.appendChild(errorMessage);
        errorMessage.classList.add("api-error");
    }

    finally {
        // Enable search button
        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
}

async function searchLegoSets(searchTerm) {
    const resultsContainer = document.querySelector("#api-results");

    resultsContainer.classList.remove("api-set-card");
    resultsContainer.textContent = "Searching for LEGO sets...";

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    try {
        const response = await fetch(
            `/.netlify/functions/searchLegoSets?search=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error("Unable to search LEGO sets.");
        }

        const data = await response.json();
        console.log("LEGO search results:", data);

        resultsContainer.textContent = 
            `Found ${data.count} matching LEGO sets.`;
    } catch (error) {
        console.error("LEGO search failed: ", error);
        resultsContainer.textContent = error.message;
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const searchTerm = setNumberInput.value.trim();

    if (!searchTerm) {
        return;
    }

    console.log("Searching for: ", searchTerm);
    searchLegoSets(searchTerm);
});