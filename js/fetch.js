
//----- FETCH

import { API_GAMES_URL } from "./constants.mjs";




//Display data:
export function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const onSale = data[i].onSale;
        //call the fuction to generate HTML
        console.log("Title:", title, "On Sale:", onSale);
    }
}


//Call data:
export async function fetchApi(url) {
    try {
        //attempts to do code
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) { //if something goes wrong it goes to error
        console.log("Error", error); 
        throw error;
    } finally {
        //cleanup
    }
}

//display all data from API:
export async function main() {
    const data = await fetchApi(API_GAMES_URL);
    displayData(data);
}

//call function:
main();