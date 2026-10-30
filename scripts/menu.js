const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("main-nav");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");
    menuButton.setAttribute("aria-expanded", isOpen);
});