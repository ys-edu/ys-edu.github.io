// event listeners for pkmnButton, nickname, dexNum
document.querySelector("#pkmnForm").addEventListener("submit", function(event) {
    validateNickname(event);
});
document.querySelector("#pkmnButton").addEventListener("click", displayPKMN);
document.querySelector("#nickname").addEventListener("change", validateNickname);

// initialize global variables
let randomNum;
// hide Pokémon stat block until button is pressed
document.querySelector("#pkmnForm").style.display = "none";

// resets nicknameError and dexNumberError to blank
document.querySelector("#nicknameError").innerHTML = "";

// displayPKMN() fetches data from web API and displays information after user enters a valid number
async function displayPKMN() {
    // display pkmnBlock info
    document.querySelector("#pkmnForm").style.display = "grid";
    // random number from 1 to 1025
    randomNum = Math.floor(Math.random() * 1025) + 1;
    // console.log("Random number: "+randomNum); testing
    let url = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    let response = await fetch(url);
    let data = await response.json();
    let pkmnSpriteImg = document.querySelector("#pkmnSprite");
    pkmnSpriteImg.src = data.sprites.front_default;
    document.querySelector("#pkmnNum").innerHTML = data.id;
    let pkmnName = data.name;
    document.querySelector("#pkmnName").innerHTML =pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);
    document.querySelector("#pkmnTypes").innerHTML = data.types[0].type[0];
}

// validateNickname() checks if the nickname is between 1-10 characters long
function validateNickname(e) {
    let isValid = true;
    let nickname = document.querySelector("#nickname").value;
    document.querySelector("#nicknameError").innerHTML = "";
    if (nickname.length > 10) {
        document.querySelector("#nicknameError").innerHTML = "Nickname is too long!";
        isValid = false;
    }
    else if (nickname.length < 1) {
        document.querySelector("#nicknameError").innerHTML = "Nickname must be 1-10 characters long!";
        isValid = false;
    }
    if (isValid == false) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}