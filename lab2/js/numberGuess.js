document.querySelector("#guessButton").addEventListener("click", checkGuess);
document.querySelector("#resetButton").addEventListener("click", initializeNumberGuess);

let randomNum;
let attemptsLeft = 7;
let wins = 0;
let losses = 0;

initializeNumberGuess();

function initializeNumberGuess() {
    randomNum = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: "+randomNum);

    document.querySelector("#resetButton").style.display = "none";
    document.querySelector("#guessButton").style.display = "inline";
    document.querySelector("#attemptsLeft").style.display = "inline";
    document.querySelector("#winRate").style.display = "inline";

    let pGuess = document.querySelector("#playerGuess");
    pGuess.focus();
    pGuess.value = "";
    let fb = document.querySelector("#feedback").value;
    fb.textContent = "Enter a number between 1 and 99!"
    document.querySelector("#attemptsLeft").textContent = "";
    document.querySelector("#winRate").textContent = wins+" Wins, "+losses+" Losses";
}

function checkGuess() {
    let pGuess = document.querySelector("#playerGuess").value;
    console.log("Player's guess: "+pGuess);
    let fb = document.querySelector("#feedback");
    fb.textContent = "";
    if (pGuess < 1 || pGuess > 99) {
        fb.textContent = "Number entered is invalid! Try a number between 1 and 99!";
        fb.style.color = "red";
        return;
    }
    attemptsLeft--;
    console.log("Attempts left: "+attemptsLeft);
    fb.style.color = "blue";
    if (pGuess === randomNum) {
        fb.textContent = "That's correct! You win!";
        fb.style.color = "green";
        wins++;
        gameOver();
    }
    else {
        document.querySelector("#previousGuesses").textContent = pGuess + " ";
        if (attemptsLeft === 1) {
            fb.textContent = "Last attempt...!";
            fb.style.color = "orange";
        }
        if (attemptsLeft === 0) {
            fb.textContent = "You lose...";
            fb.style.color = "red";
            losses++;
            gameOver();
        }
        else {
            if (pGuess > randomNum) {
                fb.textContent = "Your guess is higher!"
            }
            else {
                fb.textContent = "Your guess is lower!"
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