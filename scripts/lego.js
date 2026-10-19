const legoSets = [
{
    name: "Millennium Falcon",
    setNumber: "75192",
    theme: "Star Wars",
    year: 2017,
    pieces: 7541,
    minifigures: 8,
    ageRange: "16+",
    image: "images/millennium-falcon.png",
    description: "This amazing LEGO interpretation of Han Solo’s unforgettable Corellian freighter has all the details that Star Wars fans of any age could wish for, including intricate exterior detailing, upper and lower quad laser cannons, landing legs, lowering boarding ramp and a 4-minifigure cockpit with detachable canopy.",
    rating: 5,
    searchText: "millennium falcon star wars starship spaceship"
},
{
    name: "C-3PO",
    setNumber: "75398",
    theme: "Star Wars",
    year: 2024,
    pieces: 1138,
    minifigures: 1,
    ageRange: "18+",
    image: "images/c-3po.png",
    description: "A nostalgic gift idea for adults and any fans of the classic Star Wars saga, this collectible set offers an immersive and rewarding creative challenge. Recreate every detail of the beloved Star Wars character and turn his head or move his arms to create familiar poses.This LEGO Star Wars set for adults also features a stand with a C-3PO information plaque.",
    rating: 4,
    searchText: "c-3po star wars droid robot"
},
{
    name: "R2-D2",
    setNumber: "75399",
    theme: "Star Wars",
    year: 2024,
    pieces: 1050,
    minifigures: 2,
    ageRange: "10+",
    image: "images/r2-d2.png",
    description: "This playful buildable display toy model for boys and girls aged 10 and up is packed with authentic features so they can play out classic moments and original fantasy stories. Features include R2-D2’s 360-degree rotating head, an attachable third leg, attachable periscope and attachable tools.",
    rating: 4,
    searchText: "r2-d2 star wars droid robot"
},
{
    name: "Luke Skywalker's X-Wing Fighter",
    setNumber: "75301",
    theme: "Star Wars",
    year: 2021,
    pieces: 474,
    minifigures: 4,
    ageRange: "9+",
    image: "images/x-wing.jpg",
    description: "It’s packed with authentic details to delight fans, including an opening LEGO minifigure cockpit with space behind for R2-D2, wings that can be switched to attack position at the touch of a button, retractable landing gear and 2 spring-loaded shooters.",
    rating: 5,
    searchText: "X-Wing star wars spaceship starship"
},
{
    name: "Planet Earth and Moon in Orbit",
    setNumber: "42179",
    theme: "Technic",
    year: 2024,
    pieces: 526,
    minifigures: 0,
    ageRange: "10+",
    image: "images/earth.png",
    description: "The interactive set makes it easy to understand different concepts like the orbit of the Earth and the Moon, the Earth’s gravitational pull and how the rotations affect the seasons. Cool features include a crankshaft that kids can turn to create the rotations. There are also months and moon phases to show the progress of the Earth, Sun and Moon throughout the year",
    rating: 5,
    searchText: "planet moon earth sun orbit technic gears"
},
{
    name: "Bush Plane",
    setNumber: "42198",
    theme: "Technic",
    year: 2025,
    pieces: 333,
    minifigures: 0,
    ageRange: "8+",
    image: "images/plane.png",
    description: "Let imaginations fly with this fun aircraft toy for kids aged 8 and up. Push the lever to activate the spinning propeller. Adjust the ailerons on the side wings and the rear wing. Then open the engine cover to admire the 4-cylinder piston engine.",
    rating: 4,
    searchText: "plane technic pistons gears"
},
{
    name: "Lamborghini Huracan Techica Orange",
    setNumber: "42196",
    theme: "Technic",
    year: 2024,
    pieces: 806,
    minifigures: 0,
    ageRange: "9+",
    image: "images/lamborghini.png",
    description: "Its features are designed to thrill fans of super sports car toys and include a replica V10 engine, opening doors and steering. This model car set makes a cool gift for kids who love car toys and dream of owning their own Lamborghini.",
    rating: 5,
    searchText: "car lamborghini doors pistons technic gears"
},
{
    name: "Mercedes-AMG F1 W14 E Performance Pull-Back",
    setNumber: "42162",
    theme: "Technic",
    year: 2024,
    pieces: 240,
    minifigures: 0,
    ageRange: "7+",
    image: "images/mercedes.png",
    description: "Now it’s time for you to get in the zone as you channel that same focus to build a LEGO® Technic™ model of the Mercedes-AMG F1 W14 E Performance car. A LEGO model of the Mercedes F1 racecar with a pull back engine that allows the car to drive across your floor.",
    rating: 4,
    searchText: "racecar Mercedes F1 engine technic gears"
},
{
    name: "Leonardo da Vinci's Flying Machine",
    setNumber: "10363",
    theme: "Icons",
    year: 2025,
    pieces: 493,
    minifigures: 1,
    ageRange: "18+",
    image: "images/davinci.png",
    description: "Craft a detailed model of da Vinci’s visionary ornithopter featuring an open airframe with flappable textile-covered wings driven by a visible interplay of string, hinges and pulleys. This captivating centerpiece includes a display stand with an attachable Leonardo da Vinci minifigure holding a quill and sketch.",
    rating: 4,
    searchText: "plane icon wings gears leonardo vinci"
},
{
    name: "Yellow Construction Excavator",
    setNumber: "60420",
    theme: "City",
    year: 2024,
    pieces: 633,
    minifigures: 3,
    ageRange: "8+",
    image: "images/excavator.png",
    description: "This realistic digger toy is just like the real thing, with ground-gripping tracks, a versatile boom and a driver’s cab that rotates through 360°. The set also includes 2 cordon barriers and comes with driver, worker and architect minifigures for imaginative role play and storytelling.",
    rating: 4,
    searchText: "tractor excavator machine city construction"
},
{
    name: "Neuschwanstein Castle",
    setNumber: "21063",
    theme: "Architecture",
    year: 2025,
    pieces: 3455,
    minifigures: 0,
    ageRange: "18+",
    image: "images/castle.png",
    description: "Spend quality time building a display piece that also makes a great architectural gift for you or other history lovers. The build is full of surprises, from the exterior spires, turrets, courtyard, staircases and gabled roofs to the small interior builds.",
    rating: 5,
    searchText: "architecture castle trees scenery"
},
{
    name: "Great Pyramid of Giza",
    setNumber: "21058",
    theme: "Architecture",
    year: 2022,
    pieces: 1476,
    minifigures: 0,
    ageRange: "18+",
    image: "images/pyramid.png",
    description: "Build a beautifully detailed cross-section model of the Great Pyramid, revealing its main tunnels and chambers and the system that may have been used to move huge stones during its construction. Visualize how this area by the river Nile is thought to have looked in ancient times, with 2 small pyramids, 2 mortuary temples, Sphinx statues, an obelisk and more.",
    rating: 5,
    searchText: "architecture pyramid river scenery"
},
{
    name: "Japanese Cherry Blossom Landscape",
    setNumber: "31218",
    theme: "Art",
    year: 2026,
    pieces: 1892,
    minifigures: 0,
    ageRange: "18+",
    image: "images/cherry_blossom.png",
    description: "Inspired by the beauty of springtime in Japan and the country’s Ukiyo-e artists, this stunning brick-built 3D wall art features Mount Fuji, a teahouse, a bridge, a waterfall, flying Japanese cranes, and cherry blossom, ’Sango-Kaku’ maple and Japanese umbrella pine trees.",
    rating: 4,
    searchText: "art japanese trees scenery"
},
{
    name: "The Milky Way Galaxy",
    setNumber: "31212",
    theme: "Art",
    year: 2024,
    pieces: 3091,
    minifigures: 0,
    ageRange: "18+",
    image: "images/milky_way.png",
    description: "This awe-inspiring piece of art is created from 3,091 layered LEGO bricks and pieces to produce a 3D effect of incredible depth and texture. It includes some of the Milky Way’s most famous points of interest, including Trappist-1, The Pleiades, The Crab Nebula and The Pillars of Creation.",
    rating: 4,
    searchText: "art space galaxy spiral"
},
{
    name: "Hogwarts Castle: The Great Hall",
    setNumber: "76435",
    theme: "Harry Potter",
    year: 2024,
    pieces: 1732,
    minifigures: 11,
    ageRange: "10+",
    image: "images/hogwarts.png",
    description: "A magical gift for boys, girls and any Harry Potter fan aged 10 and up, the castle build features the largest-ever LEGO brick recreation of the Great Hall, which is packed with authentic details including floating candles and the illusion of sky. Also explore the courtyard and dungeon with a secret entrance and 3 detailed rooms.",
    rating: 4,
    searchText: "harry potter hogwarts castle magical"
},
{
    name: "Book Nook: Hogwarts Express",
    setNumber: "76450",
    theme: "Harry Potter",
    year: 2025,
    pieces: 832,
    minifigures: 2,
    ageRange: "10+",
    image: "images/hogwarts_express.png",
    description: "This magical toy lets children recreate iconic scenes at King’s Cross Platform 9¾™ with Harry Potter and Ron Weasley™ minifigures and LEGO figures of their pets Hedwig™ and Scabbers™. The train model includes a detailed locomotive and carriage with side cutouts for minifigure access, and the carriage has mirrors at one end to create the illusion of a longer train.",
    rating: 4,
    searchText: "harry potter train hogwarts magical"
},
{
    name: "Peanuts: Snoopy's Doghouse",
    setNumber: "21368",
    theme: "Ideas",
    year: 2026,
    pieces: 964,
    minifigures: 0,
    ageRange: "18+",
    image: "images/snoopy.png",
    description: "This model building kit for adults features a posable Snoopy figure which comes with 2 alternative leg builds for sitting and standing and 2 neck positions for lying down and standing. Display him lying on top of his house with his friend Woodstock on his belly, sitting up typing on his LEGO typewriter or in standing poses.",
    rating: 5,
    searchText: "peanuts snoopy dog house woodstock bird"
},
{
    name: "Disney Pixar Luxo Jr.",
    setNumber: "21357",
    theme: "Ideas",
    year: 2025,
    pieces: 613,
    minifigures: 0,
    ageRange: "18+",
    image: "images/pixar.png",
    description: "The buildable display model, which makes fantastic home office decor, is fully articulated to recreate the character’s bouncing, hopping and rotating movements. The construction set also includes a buildable Disney Pixar ball that opens up to reveal hidden Easter eggs referencing popular Disney Pixar movies.",
    rating: 4,
    searchText: "pixar lamp disney ball"
},
{
    name: "Star Trek: U.S.S. Enterprise NCC-1701-D",
    setNumber: "10356",
    theme: "Icons",
    year: 2025,
    pieces: 3600,
    minifigures: 10,
    ageRange: "18+",
    image: "images/star_trek.png",
    description: "Build a highly detailed replica of Starfleet’s legendary flagship complete with a detachable command saucer, secondary hull, warp nacelles with distinctive red and blue detailing, an opening shuttlebay, 2 mini shuttlepods and an angled display stand with a schematic and ship statistics.",
    rating: 5,
    searchText: "star trek enterprise ncc"
},
{
    name: "Eiffel tower",
    setNumber: "10307",
    theme: "Icons",
    year: 2022,
    pieces: 10001,
    minifigures: 0,
    ageRange: "18+",
    image: "images/eiffel.png",
    description: "Standing at almost 5 feet tall, the LEGO® Eiffel tower (10307) set for adults is the flagship model in the LEGO Travel & History series. And it’s not just one of the tallest LEGO sets ever, it’s got one of the largest piece counts too – with 10,001 pieces for an immersive experience from start to finish.",
    rating: 5,
    searchText: "eiffel tower paris france icon"
},
{
    name: "LEGO Titanic",
    setNumber: "10294",
    theme: "Icons",
    year: 2021,
    pieces: 9090,
    minifigures: 0,
    ageRange: "18+",
    image: "images/titanic.png",
    description: "This 1:200 scale model is designed in 3 sections, faithfully recreating the features of the Titanic. The cross section reveals interior details like the first-class dining room, the grand staircase, one of the boiler rooms and many cabins from the different passenger classes. ",
    rating: 5,
    searchText: "titanic ship boat icon"
}
];

let legoContainer = document.querySelector('#lego-sets');

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");

// When search button is clicked
searchButton.addEventListener("click", searchSets);

// When clear button is clicked
document.getElementById("clear-btn").addEventListener("click", () => {
    searchInput.value = "";
    displaySets(legoSets);
});

// When Enter key is pressed in the search field
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchSets();
    }
});

function searchSets() {
    const query = searchInput.value.toLowerCase();
    
    console.log("Searching for:", query);

    const filteredSets = legoSets.filter(set =>
        set.name.toLowerCase().includes(query) || 
        set.theme.toLowerCase().includes(query) || 
        set.description.toLowerCase().includes(query) ||
        set.searchText.includes(query));

    displaySets(filteredSets);
}

function displaySets(sets) {
    legoContainer.innerHTML = "";

    if (sets.length === 0) {
        legoContainer.innerHTML = "<p>No LEGO sets found.</p>";
        return;
    }

    sets.forEach(set => {

        const card = document.createElement("article");
        card.classList.add("set-card");

        card.innerHTML = `
            <img src="${set.image}" alt="${set.name}">

            <div class="set-info">
                <h2>${set.name}</h2>
                <p><strong>Set Number:</strong> ${set.setNumber}</p>
                <p><strong>Theme:</strong> ${set.theme}</p>
                <p><strong>Pieces:</strong> ${set.pieces}</p>
                <p><strong>Minifigures:</strong> ${set.minifigures}</p>
                <p><strong>Age:</strong> ${set.ageRange}</p>
                <p><strong>Year:</strong> ${set.year}</p>
                <p><strong>Rating:</strong>${ratingTemplate(set.rating)}</p>
                <p>${set.description}</p>
            </div>
        `;

        legoContainer.appendChild(card);
    })
}

function ratingTemplate(rating) {
    let html = `<span
    class = "rating" 
    role = "img"
    aria-label = "Rating: ${rating} out of 5"
    > `
    for (let i=1; i<=5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
        }
    }
    html += `</span>`
    return html
}

displaySets(legoSets);