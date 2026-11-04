import { getCollection, saveCollection } from "./collectionStorage.js";

// Retrieve the visitor's saved LEGO collection.
// if no collection exists, start with an empty array
const myCollection = getCollection();

const collectionList = document.querySelector("#collection-list");

let setToRemove = null;

const removeDialog = document.querySelector("#remove-set-dialog");
const cancelRemoveButton = document.querySelector("#cancel-remove-btn");
const confirmRemoveButton = document.querySelector("confirm-remove-btn");

function displayCollection() {
    collectionList.innerHTML = "";

    if (myCollection.length === 0) {
        const emptyCollection = document.createElement("h3");
        emptyCollection.textContent = "No LEGO Sets Collected";
        collectionList.appendChild(emptyCollection);
        return;
    }

    myCollection.forEach(function(set){
        const card = document.createElement("article");

        card.classList.add("collection-card");

            const cardName = document.createElement("h3");
            cardName.textContent = set.name;

            const cardNumber = document.createElement("p");
            cardNumber.textContent = `Set Number: ${set.setNumber}`;

            const cardTheme = document.createElement("p");
            cardTheme.textContent = `Theme: ${set.theme}`;

            const cardQuantity = document.createElement("p");
            cardQuantity.textContent = `Quantity: ${set.quantity}`;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = set.quantity > 1 ? "Remove One" : "Remove Set";
            removeButton.classList.add("remove-set-btn");

            removeButton.addEventListener("click", function() {
                if (set.quantity > 1) {
                    set.quantity -= 1;

                    saveCollection(myCollection); // Save collection to localStorage
                    displayCollection();
                } else { 
                    setToRemove = set;
                    removeDialog.showModal();
                }    
            });
            
            card.appendChild(cardName);
            card.appendChild(cardNumber);
            card.appendChild(cardTheme);
            card.appendChild(cardQuantity);
            card.appendChild(removeButton);

        collectionList.appendChild(card);
        
    })
}

displayCollection();

const addSetButton = document.querySelector("#add-set-btn");
const cancelSetButton = document.querySelector("#cancel-set-btn");
const addSetForm = document.querySelector("#add-set-form");

addSetButton.addEventListener("click", function() {
    addSetForm.hidden = false;
});

cancelSetButton.addEventListener("click", function() {
    addSetForm.reset();
    addSetForm.hidden = true;
});

addSetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const setNumber = document.querySelector("#set-number").value.trim();
    const setName = document.querySelector("#set-name").value.trim();
    const setTheme = document.querySelector("#set-theme").value.trim();
    const setQuantity = Number(document.querySelector("#set-quantity").value);

    if (
        setNumber === "" ||
        setName === "" ||
        setTheme === "" ||
        !Number.isInteger(setQuantity) ||
        setQuantity < 1
    ) {
        alert("Please enter valid information for all fields.");
        return;
    }

    const newSet = {
        setNumber: setNumber,
        name: setName,
        theme: setTheme,
        quantity: setQuantity
    };

    const existingSet = myCollection.find(function(set) {
        return set.setNumber === setNumber;
    });

    if (existingSet) {
        existingSet.quantity += setQuantity;
    } else {
        myCollection.push(newSet);
    }
    

    saveCollection(myCollection); // Save collection to localStorage

    displayCollection();
    addSetForm.reset();
    addSetForm.hidden = true;

});

cancelRemoveButton.addEventListener("click", function() {
    removeDialog.close();
})

confirmRemoveButton.addEventListener("click", function() {
    // check if set was selected
    if (setToRemove === null) {
        return;
    }

    const myCollection = getCollection();

    //find the selected set
    const index = myCollection.findIndex(function(item) {
        return String(item.setNumber) === String(setToRemove.setNumber);
    });

    // remove set and save
    if (index !== -1) {
        myCollection.splice(index, 1);
        saveCollection(myCollection);
    }

    setToRemove = null;    //reset variable
    removeDialog.close();  //close modal dialog
    displayCollection();   //refresh collection list
})