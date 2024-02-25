import { addToCart } from "./cart.mjs";
import { formatCurrency } from "./formatNumbers.mjs";


function generateGameHtml(game) {

    const gameDetails = document.createElement("div");
    gameDetails.classList.add("gamedetails");

    const leftSide = document.createElement("div");
    leftSide.classList.add("leftside");

    const rightSide = document.createElement("div");
    rightSide.classList.add("rightside");

    const image = document.createElement("img");
    image.src = game.image.url;
    image.alt = game.image.alt;

    const heading = document.createElement("h3");
    heading.textContent = game.title;

    const description = document.createElement("p");
    description.textContent = game.description;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");
   
    const cardOldPrice = document.createElement("p");
    cardOldPrice.textContent = formatCurrency(game.price);
    cardOldPrice.classList.add("card-old-price");

    const gameBuyButton = document.createElement("button");
    gameBuyButton.textContent = "Buy";
    gameBuyButton.addEventListener("click", () => {
        addToCart(game);
    });

    //Append:
    gameDetails.append(leftSide,rightSide);
    leftSide.append(image);
    rightSide.append(heading, description, priceContainer, cardOldPrice, gameBuyButton);

    return gameDetails;
}

function displayGameDetails() {
    const displayContainer = document.getElementById("gamedetails");
    const productDetails = JSON.parse(localStorage.getItem("product-details"));

    productDetails.forEach(function (game) {
        const gameHtml = generateGameHtml(game);
        displayContainer.appendChild(gameHtml);
    });
}

function clearProductDetails() {
    // Remove the "product-details" item from local storage
    localStorage.removeItem("product-details");
}

// Add an event listener to the window's beforeunload event
window.addEventListener('beforeunload', clearProductDetails);



function main() {
    displayGameDetails();

}

main();

