const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("main-nav");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});