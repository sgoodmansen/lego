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

// Add a LEGO set to the saved collection
// Increase quantity if already exists.
export function addToCollection(set) {
    const collection = getCollection();  //retrieve collection from localStorage

    //search for matching set inside collection
    const existingSet = collection.find(function(item) {
        const storedNumber = String(item.setNumber);
        const incomingNumber = String(set.setNumber);

        const normalizedStored = storedNumber.endsWith("-1")
            ? storedNumber
            : `${storedNumber}-1`;

        const normalizedIncoming = incomingNumber.endsWith("-1")
            ? incomingNumber
            : `${incomingNumber}-1`;

        return normalizedStored === normalizedIncoming;
    });

    console.log("Existing set: ", existingSet);

    if (existingSet) {
        existingSet.quantity += 1;  //increase quantity by 1 if there is already a set in the collection

        console.log("Exisiting image: ", existingSet.imageUrl);
        console.log("Incoming image:", set.imageUrl);

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

    console.log("Collection before saving: ", JSON.stringify(collection));
    saveCollection(collection);  //Save collection to localStorage
}