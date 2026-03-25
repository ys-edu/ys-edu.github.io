// assign variables from localStorage
let return_nickname = localStorage.getItem("nickname");
let return_pkmnSpriteSrc = localStorage.getItem("pkmnSpriteSrc");
let return_pkmnName = localStorage.getItem("pkmnName");
let return_pkmnTypes = localStorage.getItem("pkmnTypes");

// display function
displayPKMNCaught();

// caughtPKMN() shows the form completion and the Pokémon's new nickname
function displayPKMNCaught() {
    // assign values
    let pkmnSpriteImg = document.querySelector("#pkmnSprite2");
    pkmnSpriteImg.src = return_pkmnSpriteSrc;
    document.querySelector("#pkmnSprite2").className = "animate__animated animate__bounce";
    document.querySelector("#nickname2").innerHTML = return_nickname;
    document.querySelector("#pkmnName2").innerHTML = return_pkmnName;
    document.querySelector("#pkmnTypes2").innerHTML = return_pkmnTypes;
}