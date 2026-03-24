// event listeners for nickname, dexNum
document.querySelector("#nickname").addEventListener("change", validateNickname);
document.querySelector("#dexNum").addEventListener("change", displayPKMN);
document.querySelector("#dexNum").addEventListener("change", validateNum);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateNum(event);
});

// resets nicknameError and dexNumberError to blank
document.querySelector("#nicknameError").innerHTML = "";
document.querySelector("#dexNumberError").innerHTML = "";

// validateNickname() checks if the nickname is between 1-10 characters long
function validateNickname() {
    let isValid = true;
    let nickname = document.querySelector("#nickname").value;
    document.querySelector("#nicknameError").innerHTML = "";
    if (nickname.length > 10) {
        document.querySelector("#usernameError").innerHTML = "Nickname is too long!";
        isValid = false;
    }
    else if (nickname.length < 1) {
        document.querySelector("#passwordError").innerHTML = "Nickname must be 1-10 characters long!";
        isValid = false;
    }
    if (isValid == false) {
        e.preventDefault();
    }
}

// displayPKMN() fetches data from web API and displays information after user enters a valid number
async function displayPKMN() {
    let dexNumber = document.querySelector("#dexNum").value;
    let url = `https://pokeapi.co/api/v2/pokemon/${dexNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#pkmnSprite").innerHTML = data.sprites.front_default;
    document.querySelector("#pkmnName").innerHTML = data.name.toUpperCase();
    document.querySelector("#pkmnTypes").innerHTML = data.types;
}

function validateNum(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#pw").value;
    let retypePassword = document.querySelector("#retypePW").value;
    document.querySelector("#passwordError").innerHTML = "";
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username is required!";
        isValid = false;
    }
    else if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters long!";
        isValid = false;
    }
    else if (retypePassword != password) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match!";
        isValid = false;
    }
    if (isValid == false) {
        e.preventDefault();
    }
}