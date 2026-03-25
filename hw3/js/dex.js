// event listeners for pkmnButton, nickname, dexNum
document.querySelector("#pkmnForm").addEventListener("submit", function(event) {
    validateNickname(event);
});
document.querySelector("#pkmnButton").addEventListener("click", displayPKMN);
document.querySelector("#nickname").addEventListener("change", validateNickname);

// initialize global variables. specialPKMN enum for caching Legendaries and Mythicals
let randomNum;
let display = false;
// hide Pokémon stat block until button is pressed
document.querySelector("#pkmnForm").style.display = "none";

// resets nicknameError to blank
document.querySelector("#nicknameError").innerHTML = "";

// helper function to display types since some Pokémon can have 2
function displayTypes(typesData) {
    for (let i = 0; i < typesData.length; i++) {
        let type = typesData[i];
        // converts JSON to string, then removes quotes and capitalizes it
        let strType = JSON.stringify(type['type']['name'])
        strType = strType.replace(/^"(.*)"$/, '$1');
        strType = strType.charAt(0).toUpperCase() + strType.slice(1);
        // if there are two types, add a colon and space in between
        if (i > 0) {
            document.querySelector("#pkmnTypes").innerHTML += ", "+strType;
        }
        else {
            document.querySelector("#pkmnTypes").innerHTML += strType;
        }
    }
}

// displayPKMN() fetches data from web API and displays information after user enters a valid number
async function displayPKMN() {
    // display pkmnBlock info and resets types and img display
    document.querySelector("#pkmnForm").style.display = "grid";
    document.querySelector("#pkmnTypes").innerHTML = "";
    document.querySelector("#pkmnSprite").className = "";
    display = true;
    // random number from 1 to 1025
    randomNum = Math.floor(Math.random() * 1025) + 1;
    // console.log("Random number: "+randomNum); testing
    let url = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    let response = await fetch(url);
    let data = await response.json();
    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${randomNum}/`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    let pkmnSpriteImg = document.querySelector("#pkmnSprite");
    pkmnSpriteImg.src = data.sprites.front_default;
    document.querySelector("#pkmnSprite").className = "animate__animated animate__bounce";
    document.querySelector("#pkmnNum").innerHTML = data.id;
    let pkmnName = data.name;
    document.querySelector("#pkmnName").innerHTML = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);
    displayTypes(data.types);
    cardFormat(data2);
    console.log(document.querySelector("#pkmnName").innerHTML);
}

// formats the card differently depending on if the Pokémon is rare
function cardFormat(data) {
    if (data.is_legendary == true) {
        document.querySelector(`#pkmnBlock`).className = "card bg-dark border-warning border-5 p-4";
        document.querySelector("#announcement").innerHTML = "Wow! a Legendary Pokémon!";
    }
    else if (data.is_mythical == true) {
        document.querySelector(`#pkmnBlock`).className = "card bg-dark border-info border-5 p-4";
        document.querySelector("#announcement").innerHTML = "Amazing!! a Mythical Pokémon!";
    }
    else {
        document.querySelector(`#pkmnBlock`).className = "card bg-dark border-danger border-5 p-4";
        document.querySelector("#announcement").innerHTML = "";
        document.querySelector(`#announcement`).className = "text-black";
    }
    if (display) {
        document.querySelector("#pkmnButton").innerHTML = "Search for a different Pokémon!";
    }
}

// validateNickname() checks if the nickname is between 1-10 characters long. then, calls saveForm() to complete
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
    if (isValid === false) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    else {
        saveForm()
    }
}

// saveForm() saves entered nickname and Pokémon data to send to nickname_complete.js
function saveForm() {
    localStorage.setItem("nickname", document.querySelector("#nickname").value);
    localStorage.setItem("pkmnSpriteSrc", document.querySelector("#pkmnSprite").src);
    localStorage.setItem("pkmnName", document.querySelector("#pkmnName").innerHTML);
    localStorage.setItem("pkmnTypes", document.querySelector("#pkmnTypes").innerHTML);
}

