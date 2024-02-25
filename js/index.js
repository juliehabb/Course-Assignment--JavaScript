import { fetchApi } from "../js/fetch.js";
import { API_GAMES_URL } from "./constants.mjs";
import { addToCart } from "./cart.mjs";
import { addToProductDetails } from "./productDetails.mjs";
import { loadingScreen } from "./loader.mjs";

loadingScreen();


function createCart() {
    const cart = localStorage.getItem ("cart");
    if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
}

function createProductDetails() {
    const productDetails = localStorage.getItem ("product-details");
    if (!productDetails) {
        localStorage.setItem("product-details", JSON.stringify([]));
    }
}

//Filter buttons:
const actionGenreButton = document.getElementById("genre-action");
const sportsGenreButton = document.getElementById("genre-sports");
const adventureGenreButton = document.getElementById("genre-adventure");
const horrorGenreButton = document.getElementById("genre-horror");
const clearGenreButton = document.getElementById("genre-clear");


let chosenGenre = "";

actionGenreButton.addEventListener("click",() => {
    chosenGenre = "Action";
    renderHomePage();
} )

sportsGenreButton.addEventListener("click",() => {
    chosenGenre = "Sports";
    renderHomePage();
} )

adventureGenreButton.addEventListener("click",() => {
    chosenGenre = "Adventure";
    renderHomePage();
} )

horrorGenreButton.addEventListener("click",() => {
    chosenGenre = "Horror";
    renderHomePage();
} )

clearGenreButton.addEventListener("click",() => {
    chosenGenre = "";
    renderHomePage();
} )

//Generate HTML elements:
function generateGameHtml(game) {

    //Containers:
    const gamesSaleSection = document.createElement("div");
    gamesSaleSection.classList.add("games-sale-section");

    const gamesContainer = document.createElement("div");
    gamesContainer.classList.add("games-container");

    const gamesCard = document.createElement("article");
    gamesCard.classList.add("games-card");

    const imageContainer = document.createElement("a");
    imageContainer.classList.add("image-container");
    imageContainer.href = `Game_Details.html?title=${encodeURIComponent(game.title)}`;
    imageContainer.addEventListener("click", () => {
        addToProductDetails(game);
    });

    const gamesImage = document.createElement("figure");
    gamesImage.classList.add("games-image");

    //Content:
    const image = document.createElement("img");
    image.src = game.image.url;
    image.alt = game.image.alt;

    const gamesContent = document.createElement("div");
    gamesContent.classList.add("games-content");

    const heading = document.createElement("h3");
    heading.textContent = game.title;

    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("tags-container");

    const cardGenre = document.createElement("p");
    cardGenre.textContent = game.genre;
    cardGenre.classList.add("card-tag");

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    const cardOldPrice = document.createElement("p");
    cardOldPrice.textContent = game.price;
    cardOldPrice.classList.add("card-old-price");

    const cardDiscountedPrice = document.createElement("p");
    cardDiscountedPrice.textContent = game.discountedPrice;
    cardDiscountedPrice.classList.add("card-price");

    const gameBuyButton = document.createElement("button");
    gameBuyButton.textContent = "Buy";
    gameBuyButton.classList.add("game-buy-button");
    gameBuyButton.addEventListener("click", () => {
        addToCart(game);
    });

    //Append:
    gamesSaleSection.append(gamesContainer);
    gamesContainer.appendChild(gamesCard);
    gamesCard.append(imageContainer, gamesContent);
    imageContainer.append(gamesImage);
    gamesImage.appendChild(image);
    gamesContent.append(heading, tagsContainer, cardGenre, priceContainer, gameBuyButton);
    priceContainer.append(cardOldPrice, cardDiscountedPrice);

    return gamesSaleSection;
}
    
function displayGames(games) {
    const displayContainer = document.querySelector("#games-sale-section");
    displayContainer.textContent = "";
    games
    .filter(game => {
        if (game.genre === chosenGenre || chosenGenre === "") {
            return true;
        }
    }).forEach(function (game) {
        const gameHtml = generateGameHtml(game);
        displayContainer.appendChild(gameHtml);
    });
}

async function renderHomePage() {
    try {
        createCart();
        createProductDetails();
        const responseData = await fetchApi(API_GAMES_URL);
        const games = responseData.data;
        displayGames(games);
    } catch (error) {
    }
}

async function main() {
    await renderHomePage();
}

main();