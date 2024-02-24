
const API_URL = "https://api.noroff.dev/api/v1/gamehub";

async function main() {
    const responseData = await fetchApi(API_GAMES_URL);
    const games = responseData.data;
    displayGames(games);
}




async function fetchApi(url) {
    try {
        console.log("am i running");
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log("Error", error); 
    }
}








fetch("https://api.noroff.dev/api/v1/gamehub")
    .then((response) => response.json())
    .then((json) => console.log(json));


//Get the games container
var cardContainer = document.getElementById("game-container");

var newGame = document.createElement("article");
newGame.className = "card";

//Add image to card
var cardImage = document.createElement("img");
cardImage.src = "Sunkenland.jpg";
newGame.appendChild(cardImage);

//Add title to card
var cardTitle = document.createElement("h2");
cardTitle.textContent = "Card Title";
newGame.appendChild(cardTitle);


// Put card on the table (in the card container)
cardContainer.appendChild(newGame);

gamesContainer.append(gamesCard, gamesDetails, gamesContent, heading, tagsContainer, cardTag);




//FILTER GAMES YOUTUBE VID

//FILTER GAMES


const filterList = document.querySelector(".filter");
const filterButtons = filterList.querySelectorAll(".filter-btn");
//"GamesContainer instead of "conferences":
const gameContainer = document.querySelectorAll(".games-container");

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter");
        console.log(filter);

        // change the active button
        updateActiveButton(e.target);
        filterGames(filter);
    })
})

function updateActiveButton(newButton)  {
    const activeButton = filterList.querySelector('active');
    if (activeButton) {
        activeButton.classList.remove('.active');
    }

    // add the active class to our new button 
    newButton.classList.add("active");
}


//Change modes of buttons:
function filterGames(gamesFilter) {
    //get each game category
    gameContainer.forEach((gam) => {
        //get genre from games:
        const gamGenre = gam.getAttribute("data-genre");
        console.log(gamGenre)

        //Check if category matches the filter
        if (gamesFilter === gamGenre) {
            gam.removeAttribute("hidden");
            //if it matches, show that conf
        } else {
            gam.setAttribute("hidden", "");
        }
});

    
    // if not, hide the conf
}



updateActiveButton();

//const cardGenre = document.createElement("p");
//cardGenre.textContent = game.genre;