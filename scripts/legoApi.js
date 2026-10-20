// Test retrieving JSON data from an external API
async function testFetch() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    console.log("HTTP Status:", response.status);
    console.log("Response Object: ", response);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Retrieved data: ",data);

    } catch (error) {
        console.error("Unable to retrieve data: ", error.message);
    }
}

testFetch();

