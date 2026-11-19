// Retrieve the saved LEGO collection from localStorage.
// If a collection exists, convert the JSON string into a JavaScript array. Then return the array.
// If no collection exists, return an empty array.
export function getCollection() {
    const savedCollection = localStorage.getItem("legoCollection");

    return savedCollection
        ? JSON.parse(savedCollection)
        : [];
}

//Save the entire LEGO collection to localStorage
// Convert the JavaScript array into a JSON string before storing it.
export function saveCollection(collection) {
    localStorage.setItem("legoCollection", JSON.stringify(collection));
}

// accepts a LEGO set number and converts it to a consistent format for comparison
function normalizeSetNumber(setNumber) {
    const number = String(setNumber);

    return number.endsWith("-1")
        ? number
        : `${number}-1`;
}

export function findSetInCollection(setNumber) {
    const collection = getCollection();

    return collection.find(function(item) {
        return normalizeSetNumber(item.setNumber) === normalizeSetNumber(setNumber);
    })
}

// Add a LEGO set to the saved collection
// Increase quantity if already exists.
export function addToCollection(set) {
    const collection = getCollection();  //retrieve collection from localStorage
    const quantityToAdd = set.quantity ?? 1;  //increase quantity by stored value or 1 if value is null

    //search for matching set inside collection
    const existingSet = collection.find(function(item) {
        return normalizeSetNumber(item.setNumber) === normalizeSetNumber(set.setNumber);
    });

    console.log("Existing set: ", existingSet);

    if (existingSet) {
        existingSet.quantity += quantityToAdd;

        // add an image if the existing entry doesn't have one
        if (!existingSet.imageUrl && set.imageUrl) {
            existingSet.imageUrl = set.imageUrl;
        }
    } else {
        const newSet = {
            setNumber: set.setNumber,
            name: set.name,
            theme: set.theme,
            imageUrl: set.imageUrl || null,
            quantity: 1
        };
        collection.push(newSet);  //Add newSet to end of the collection array
    }

    saveCollection(collection);  //Save collection to localStorage
}