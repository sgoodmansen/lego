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
    } catch (error) {
        console.error("Error retrieving LEGO set: ", error);

        detailsContainer.textContent = "Unable to load LEGO set information. Please try again.";
    }
}