import { addToCollection } from "./collectionStorage.js";

let legoContainer = document.querySelector('#lego-sets');
let currentController = null;

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");

// When search button is clicked
searchButton.addEventListener("click", searchSets);

// When clear button is clicked
document.getElementById("clear-btn").addEventListener("click", () => {
    searchInput.value = "";
    loadLegoSets("castle");
});

// When Enter key is pressed in the search field
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchSets();
    }
});

function searchSets() {
    const query = searchInput.value.trim();
    
    console.log("Searching Rebrickable for: ", query);

    if (query === "") {
        return;
    }

    loadLegoSets(query);
}

async function loadLegoSets(searchTerm) {
    // to cancel an earlier search when a new search begins
    if (currentController) {
        currentController.abort();
    }
    currentController = new AbortController();
    const controller = currentController;

    legoContainer.replaceChildren();

    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading LEGO sets...";
    loadingMessage.setAttribute("role", "status");

    legoContainer.appendChild(loadingMessage);

    try {
        const response = await fetch(
            `/.netlify/functions/searchLegoSets?search=${encodeURIComponent(searchTerm)}`,
            { signal: controller.signal }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        console.log("Explore API results: ", data.results);

        const apiSets = data.results.map(function(set) {
            return {
                setNumber: set.set_num,
                name: set.name,
                year: set.year,
                pieces: set.num_parts,
                image: set.set_img_url,
                theme: `Theme ID: ${set.theme_id}`
            };
        });

        // Prevent outdated results from displaying
        if (controller !== currentController) {
            return;
        }

        displayApiSets(apiSets);

        console.log("Converted LEGO sets: ", apiSets);
    } catch (error) {
        if (error.name === "AbortError" || controller !== currentController) {
            return;
        }

        console.error("Unable to load LEGO sets:", error);

        legoContainer.replaceChildren();
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Unable to load LEGO sets. Please try again.";

        errorMessage.setAttribute("role", "alert");

        legoContainer.appendChild(errorMessage);
    }
}

async function getThemeName(setNumber) {
    const response = await fetch(
        `/.netlify/functions/getLegoSet?set=${encodeURIComponent(setNumber)}`
    );

    if (!response.ok) {
        throw new Error(`Unable to retrieve set: ${setNumber}`);
    }

    const data = await response.json();

    return data.theme_name;
}

function displayApiSets(sets) {
    legoContainer.innerHTML = "";

    if (sets.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No LEGO sets found.";
        legoContainer.appendChild(message);
        return;
    }

    sets.forEach(function(set) {
        const card = document.createElement("article");
        card.classList.add("set-card");

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("set-info");

        const image = document.createElement("img");
        image.src = set.image;
        image.alt = set.name;
        image.loading = "lazy";

        const name = document.createElement("h2");
        const detailsLink = document.createElement("a");
        detailsLink.href = `set-details.html?set=${encodeURIComponent(set.setNumber)}`;
        detailsLink.textContent = set.name;

        name.appendChild(detailsLink);

        const number = document.createElement("p");
        number.textContent = `Set Number: ${set.setNumber}`;

        const pieces = document.createElement("p");
        pieces.textContent = `Pieces: ${set.pieces.toLocaleString()}`;

        card.appendChild(image);

        cardInfo.appendChild(name);
        cardInfo.appendChild(number);
        cardInfo.appendChild(pieces);

        const addButton = document.createElement("button");

        addButton.type="button";
        addButton.textContent = "Add to Collection";
        addButton.classList.add("add-to-collection-btn");

        addButton.addEventListener("click", async function() {
            addButton.disabled = true;

            try {
                const themeName = await getThemeName(set.setNumber);

                const selectedSet = {
                    setNumber: set.setNumber,
                    name: set.name,
                    theme: themeName
                };

                addToCollection(selectedSet);
                addButton.textContent = "Added to Collection!";

                console.log("Added to collection: ", selectedSet);

            } catch (error) {
                console.error("Unable to add LEGO set: ", error);
                alert("Unable to add this set right now. Please try again.");
            } finally {
                addButton.disabled = false;
            }

        });

        cardInfo.appendChild(addButton);
        card.appendChild(cardInfo);

        legoContainer.appendChild(card);
    });
}

loadLegoSets("castle");
