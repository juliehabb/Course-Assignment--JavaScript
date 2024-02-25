export function getProductDetails() {
    const productDetails = JSON.parse(localStorage.getItem("product-details"));
    return productDetails;
}



export function addToProductDetails(game) { 
    const productDetails = getProductDetails();
    const itemIndex = productDetails.findIndex(function(currentGame) {
        if (game.id === currentGame.id) {
            return true;
        }
        return false;
    });
    if (itemIndex === -1) {
        productDetails.push({...game, quantity: 1 });
    } else {
        productDetails[itemIndex].quantity += 1;
    }
    localStorage.setItem("product-details", JSON.stringify(productDetails));     
}