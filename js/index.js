
// 1. Make it Worker
// 2. Make it right
// 3. Make it fast



import { fetchApi } from "../js/fetch.js";
import { addToCart } from "./cart.mjs";
import { API_GAMES_URL } from "./constants.mjs";

function createCart() {
    const cart = localStorage.getItem ("cart");
    if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
}




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




//Returns game HTML:



function generateGameHtml(game) {
    const gamesContainer = document.createElement("div");
    gamesContainer.classList.add("games-container");

    //Image:
    const imageContainer = document.createElement("a");
    imageContainer.classList.add("image-container");

    const gamesImage = document.createElement("figure");
    gamesImage.classList.add("games-image");

    const image = document.createElement("img");
    image.src = game.image.url;
    image.alt = game.image.alt;


    //Text content:

    const gamesCard = document.createElement("article");
    gamesCard.classList.add("games-card");

    const gamesDetails = document.createElement("div");
    gamesDetails.classList.add("games-details");

    const gamesContent = document.createElement("div");
    gamesContent.classList.add("games-content");

    const heading = document.createElement("h3");
    heading.textContent = game.title;

    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("tags-container");

    const cardGenre = document.createElement("p");
    cardGenre.textContent = game.genre;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    const cardOldPrice = document.createElement("p");
    cardOldPrice.textContent = game.price;

    const cardDiscountedPrice = document.createElement("p");
    cardDiscountedPrice.textContent = game.discountedPrice;

    const gameBuyButton = document.createElement("button");
    gameBuyButton.textContent = "Buy";
    gameBuyButton.classList.add("game-buy-button");
    gameBuyButton.addEventListener("click", () => {
        addToCart(game);
    });


    //add elements to page:
    gamesContainer.appendChild(gamesCard);
    gamesContainer.appendChild(imageContainer);
    imageContainer.appendChild(gamesImage);
    gamesImage.appendChild(image);
    gamesCard.appendChild(gamesDetails);
    gamesDetails.appendChild(gamesContent);
    gamesContent.appendChild(heading);
    gamesContent.appendChild(tagsContainer);
    tagsContainer.appendChild(cardGenre);
    gamesContent.appendChild(priceContainer);
    priceContainer.appendChild(cardOldPrice);
    priceContainer.appendChild(cardDiscountedPrice);
    gamesContent.appendChild(gameBuyButton);

    return gamesContainer;
}
    
function displayGames(games) {
    const displayContainer = document.querySelector("#display-container");
    displayContainer.textContent = "";
    console.log(displayContainer);
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
        const responseData = await fetchApi(API_GAMES_URL);
        const games = responseData.data;
        displayGames(games);
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    await renderHomePage();
}

main();


