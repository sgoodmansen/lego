import { addToCollection } from "./collectionStorage.js";

// Retrieve the LEGO set number from the page URL
const params = new URLSearchParams(window.location.search);

const setNumber = params.get("set");

// Find the container where LEGO set details will appear
const detailsContainer = document.querySelector("#set-details-container");

console.log("Selected LEGO set: ", setNumber);

if (!setNumber || !setNumber.trim()) {
    detailsContainer.textContent = "No LEGO set was selected. Please return to Explore and choose a set.";    
} else {
    getSetDetails(setNumber.trim());
}

async function getSetDetails(setNumber) {
    try {
        const response = await fetch(
            `/.netlify/functions/getLegoSet?set=${encodeURIComponent(setNumber)}`
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve LEGO set details.");
        }

        const data = await response.json();

        console.log("LEGO set details:", data);

        // Remove the loading message
        detailsContainer.textContent = "";

        // Create the main card
        const detailsCard = document.createElement("article");
        detailsCard.classList.add("details-card");

        // Create the image container
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("details-image");

        // Create the information container
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("details-info");

        // LEGO SET NAME
        const setName = document.createElement("h2"); // Create a heading for the LEGO set    
        setName.textContent = data.name; // Add the set name returned by Rebrickable
        infoContainer.appendChild(setName); 

        // LEGO SET IMAGE
        const setImage = document.createElement("img"); // Create the LEGO set image
        setImage.src = data.set_img_url; // Set the image source
        setImage.alt = data.name; // Provide alternative text for accessibility
        setImage.classList.add("set-image"); // Add a CSS class for styling 
        imageContainer.appendChild(setImage); 

        // LEGO SET NUMBER
        const setNumberText = document.createElement("p");
        setNumberText.textContent = `Set Number: ${data.set_num}`;
        infoContainer.appendChild(setNumberText);

        // LEGO SET RELEASE YEAR
        const setYear = document.createElement("p");
        setYear.textContent = `Release Year: ${data.year}`;
        infoContainer.appendChild(setYear);

        // LEGO SET PIECE COUNT
        const setPieces = document.createElement("p");
        setPieces.textContent = `Pieces: ${data.num_parts.toLocaleString()}`;
        infoContainer.appendChild(setPieces);

        // LEGO SET THEME NAME
        const setTheme = document.createElement("p");
        setTheme.textContent = `Theme: ${data.theme_name}`;
        infoContainer.appendChild(setTheme);

        // Create the Add to My Collection button
        const addButton = document.createElement("button");
        addButton.textContent = "Add to My Collection"
        addButton.classList.add("add-collection-btn");
        infoContainer.appendChild(addButton);

        const saveMessage = document.createElement("p");
        saveMessage.classList.add("save-message");
        saveMessage.setAttribute("role", "status");
        saveMessage.setAttribute("aria-live", "polite");
        infoContainer.appendChild(saveMessage);

        // Add the image and information sections to the card
        detailsCard.appendChild(imageContainer);
        detailsCard.appendChild(infoContainer);

        // Add the completed card to the webpage
        detailsContainer.appendChild(detailsCard);

        addButton.addEventListener("click", function() {
            const selectedSet = {
                setNumber: data.set_num,
                name: data.name,
                theme: data.theme_name
            };

            addToCollection(selectedSet);
            saveMessage.textContent = `${data.name} added to your collection!`;

            console.log("Added to collection: ", selectedSet);
        })
    } catch (error) {
        console.error("Error retrieving LEGO set: ", error);

        detailsContainer.textContent = "Unable to load LEGO set information. Please try again.";
    }
}