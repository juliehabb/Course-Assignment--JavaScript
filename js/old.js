
Old checkout:

import { addToCart } from "./cart.mjs";
import { formatCurrency } from "./formatNumbers.mjs";
import { removeFromCart } from "./cart.mjs";
import { clearCart } from "./cart.mjs";

function generateHtmlForItem(game) {
    const container = document.createElement("div");
    container.classList.add("container");

    const gameShoppingCart = document.createElement("div");
    gameShoppingCart.classList.add("game-shoppingcart");


    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");


    const image = document.createElement("img");
    image.src = game.image.url;
    image.alt = game.image.alt;


    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const gameTitle = document.createElement("h4");
    gameTitle.textContent = game.title;

    const gameGenre = document.createElement("p");
    gameGenre.textContent = game.genre;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    const gameQuantity = document.createElement("div");
    gameQuantity.textContent = "Quantity: " + game.quantity;

    const gamePrice = document.createElement("div");
    gamePrice.classList.add("price-game");
    gamePrice.textContent = "Price: " + game.price;

    const quantityAdjustmentContainer = document.createElement("div");

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
        addToCart(game);
        displayCartItems();
    });

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
        removeFromCart(game);
        displayCartItems();
    });



    //Outside card:



    const removeItems = document.createElement("button");
    removeItems.textContent = "Remove all Items";
    removeItems.addEventListener("click", () => {
        clearCart();
        displayCartItems();
    });

    const checkoutContainer = document.createElement("div");
    checkoutContainer.classList.add("checkout-container");

    const subtotal = document.createElement("div");
    subtotal.classList.add("subtotal");

    const gamePriceTotal = document.createElement("div");
    gamePriceTotal.classList.add("price-game");
    gamePriceTotal.textContent = "Total: " + formatCurrency(game.price * game.quantity);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const checkoutButtonBox = document.createElement("a");
    checkoutButtonBox.classList.add("checkout-button-box");
    

    const primaryButton = document.createElement("button");
    primaryButton.classList.add("primary-button");
    primaryButton.textContent = "Check out";
    primaryButton.addEventListener("click", function() {
        window.location.href = "Success.html";
    })
    

    const secondaryButton = document.createElement("div");
    secondaryButton.classList.add("secondary-button");
    secondaryButton.textContent = "Continue shopping";
    
    //Append:

    container.append(gameShoppingCart, checkoutContainer);
    gameShoppingCart.append(imageContainer, infoContainer, priceContainer);
    imageContainer.append(image);
    infoContainer.append(gameTitle, gameGenre);
    priceContainer.append(gamePrice, gameQuantity, quantityAdjustmentContainer);
    //Outside card
    checkoutContainer.append(removeItems, subtotal, gamePriceTotal, buttons);
    buttons.append(checkoutButtonBox, secondaryButton, primaryButton, )
    quantityAdjustmentContainer.append(increaseButton, decreaseButton);

    return container;

}


function displayCartItems() {
    const displayContainer = document.getElementById("container");
    displayContainer.textContent = "";
    const cart = JSON.parse(localStorage.getItem("cart"));

    cart.forEach(function (currentGame) {
        const gameHtml = generateHtmlForItem(currentGame);
        displayContainer.appendChild(gameHtml);
    });
}

function main() {
    displayCartItems();

}

main();