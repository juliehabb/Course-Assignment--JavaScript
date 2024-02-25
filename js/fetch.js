
import { API_GAMES_URL } from "./constants.mjs";

//Display data:
export function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const onSale = data[i].onSale;
        //call the function to generate HTML
    }
}

//Call data:
export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) { 
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

main();