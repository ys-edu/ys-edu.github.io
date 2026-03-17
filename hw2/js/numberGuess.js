// listeners for buttons
document.querySelector("#guessButton").addEventListener("click", checkGuess);
document.querySelector("#resetButton").addEventListener("click", initializeNumberGuess);

// initialize global variables
let randomNum;
let attemptsLeft;
// these variables do not reset when pressing the reset button
let wins = 0;
let losses = 0;

initializeNumberGuess();

// initializeNumberGuess() resets values of the game to its initial state
function initializeNumberGuess() {
    // resets attempts left to 7
    attemptsLeft = 7;
    // creates a random number from 1 to 99
    randomNum = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: "+randomNum);

    // shows guess button, hides reset button, resets previous guesses when beginning a new game
    document.querySelector("#resetButton").style.display = "none";
    document.querySelector("#guessButton").style.display = "inline";
    document.querySelector("#attemptsLeft").style.display = "inline";
    document.querySelector("#winRate").style.display = "inline"
    document.querySelector("#previousGuesses").textContent = "";

    // focuses the text input
    let pGuess = document.querySelector("#playerGuess");
    pGuess.focus();
    pGuess.value = "";
    // resets attempts left
    document.querySelector("#attemptsLeft").textContent = "7";
    // win/loss tallies are retained between games
    document.querySelector("#winRate").textContent = wins+" Wins, "+losses+" Losses";
}

// checkGuess() determines if the player's input number is correct, otherwise
// continues the game
function checkGuess() {
    let pGuess = document.querySelector("#playerGuess").value;
    console.log("Player's guess: "+pGuess);
    let fb = document.querySelector("#feedback");
    fb.textContent = "";
    // checks if the number is valid and raises an error if not valid.
    // invalid numbers do not count towards attempts left
    if (pGuess < 1 || pGuess > 99 || isNaN(pGuess)) {
        fb.textContent = "Number entered is invalid! Try a number between 1 and 99!";
        fb.style.color = "red";
        return;
    }
    // if number is valid, decrements attempts left and updates it
    attemptsLeft--;
    document.querySelector("#attemptsLeft").textContent = attemptsLeft;
    // win condition
    if (pGuess == randomNum) {
        fb.textContent = "That's correct! You win!";
        fb.style.color = "green";
        wins++;
        document.querySelector("#winRate").textContent = wins+" Wins, "+losses+" Losses";
        gameOver();
    }
    // incorrect number guessed
    else {
        // displays previously guessed numbers
        document.querySelector("#previousGuesses").textContent += pGuess + " ";
        if (attemptsLeft == 0) {
            fb.textContent = "You lose...the number was "+randomNum+"!";
            fb.style.color = "red";
            losses++;
            document.querySelector("#winRate").textContent = wins+" Wins, "+losses+" Losses";
            gameOver();
        }
        else {
            fb.style.color = "#0A1313";
            // if it's the last attempt, make the text orange along with the hint
            if (attemptsLeft == 1) {
                fb.textContent = "Last attempt...! ";
                fb.style.color = "orange";
            }
            if (pGuess > randomNum) {
                fb.textContent += "Your guess is higher!"
            }
            else {
                fb.textContent += "Your guess is lower!"
            }
        }
    }
}

function gameOver() {
    let gButton = document.getElementById("guessButton");
    let rButton = document.getElementById("resetButton");
    gButton.style.display = "none"
    rButton.style.display = "inline"
}