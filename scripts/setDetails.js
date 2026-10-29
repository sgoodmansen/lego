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

        // LEGO SET NAME
        const setName = document.createElement("h2"); // Create a heading for the LEGO set    
        setName.textContent = data.name; // Add the set name returned by Rebrickable
        detailsContainer.appendChild(setName); // Insert the heading into the page

        // LEGO SET IMAGE
        const setImage = document.createElement("img"); // Create the LEGO set image
        setImage.src = data.set_img_url; // Set the image source
        setImage.alt = data.name; // Provide alternative text for accessibility
        setImage.classList.add("set-image"); // Add a CSS class for styling 
        detailsContainer.appendChild(setImage); // Insert the image into the page

        // LEGO SET NUMBER
        const setNumberText = document.createElement("p");
        setNumberText.textContent = `Set Number: ${data.set_num}`;
        detailsContainer.appendChild(setNumberText);

        // LEGO SET RELEASE YEAR
        const setYear = document.createElement("p");
        setYear.textContent = `Release Year: ${data.year}`;
        detailsContainer.appendChild(setYear);

        const setPieces = document.createElement("p");
        setPieces.textContent = `Pieces: ${data.num_parts.toLocaleString()}`;
        detailsContainer.appendChild(setPieces);

        // Create the Add to My Collection button
        const addButton = document.createElement("button");
        addButton.textContent = "Add to My Collection"
        addButton.classList.add("add-collection-btn");
        detailsContainer.appendChild(addButton);

        addButton.addEventListener("click", function() {
            console.log("Add to Collection clicked: ", data.set_num);
        })
    } catch (error) {
        console.error("Error retrieving LEGO set: ", error);

        detailsContainer.textContent = "Unable to load LEGO set information. Please try again.";
    }
}