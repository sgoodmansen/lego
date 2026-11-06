import { addToCollection } from "./collectionStorage.js";

let legoContainer = document.querySelector('#lego-sets');
const paginationContainer = document.querySelector("#pagination");

let currentController = null;
let currentPage = 1;
let currentSearchTerm = "castle"

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

async function loadLegoSets(searchTerm, page = 1) {
    currentSearchTerm = searchTerm;
    currentPage = page;

    // to cancel an earlier search when a new search begins
    if (currentController) {
        currentController.abort();
    }
    currentController = new AbortController();
    const controller = currentController;

    paginationContainer.replaceChildren();

    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading LEGO sets...";
    loadingMessage.setAttribute("role", "status");
    loadingMessage.classList.add("loading-message");

    legoContainer.appendChild(loadingMessage);

    try {
        const response = await fetch(
            `/.netlify/functions/searchLegoSets?search=${encodeURIComponent(searchTerm)}&page=${page}`,
            { signal: controller.signal }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

console.log("Total matching sets:", data.count);
console.log("Next page:", data.next);
console.log("Previous page:", data.previous);
        
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
        displayPagination(data.count);

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

        const imageLink = document.createElement("a");
        imageLink.href = `set-details.html?set=${encodeURIComponent(set.setNumber)}`;
        imageLink.appendChild(image);

        const name = document.createElement("h2");
        const detailsLink = document.createElement("a");
        detailsLink.href = `set-details.html?set=${encodeURIComponent(set.setNumber)}`;
        detailsLink.textContent = set.name;

        name.appendChild(detailsLink);

        const number = document.createElement("p");
        number.textContent = `Set Number: ${set.setNumber}`;

        const pieces = document.createElement("p");
        pieces.textContent = `Pieces: ${set.pieces.toLocaleString()}`;

        card.appendChild(imageLink);

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
                    theme: themeName,
                    imageUrl: set.image
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

function displayPagination(totalResults) {
    const pageSize = 18;
    const totalPages = Math.ceil(totalResults / pageSize);

    if (totalPages === 0) {
        paginationContainer.replaceChildren();
        return;
    }

    paginationContainer.replaceChildren();

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "Previous";
    previousButton.disabled = currentPage <= 1;

    paginationContainer.appendChild(previousButton);

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    paginationContainer.appendChild(pageIndicator);

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage >= totalPages;
    
    paginationContainer.appendChild(nextButton);

    nextButton.addEventListener("click", function() {
        loadLegoSets(currentSearchTerm, currentPage + 1);
    });

    previousButton.addEventListener("click", function() {
        loadLegoSets(currentSearchTerm, currentPage - 1);
    });

    console.log("Current page: ", currentPage);
    console.log("Total pages: ", totalPages);
}

loadLegoSets("castle");
