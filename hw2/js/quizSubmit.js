// listener for quizButton
document.querySelector("#quizButton").addEventListener("click", gradeQuiz);

// initialize global variables
let randomNum;
let attemptsLeft;
// these variables do not reset when pressing the reset button
let wins = 0;
let losses = 0;

// gradeQuiz() checks the quiz responses and compares them to answers
function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validation").innerHTML = "";
    if (!isFormValid()) {
        return;
    }

    // variables
    let score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    console.log("Q1: "+q1Response+"Q2: "+q2Response);

    // grading Question 1:
    if (q1Response === "bear") {
        document.querySelector("#q1Feedback").innerHTML = "Correct!";
        document.querySelector("#q1Feedback").className = "bg-success text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/confirmed.png' width=50px alt='confirmed checkmark'>";
        score += 10;
    }
    else {
        document.querySelector("#q1Feedback").innerHTML = "Incorrect...";
        document.querySelector("#q1Feedback").className = "bg-warning text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/cancel.png' width=50px alt='xmark'>";
    }
    // grading Question 2:
    if (q2Response === "ak") {
        document.querySelector("#q2Feedback").innerHTML = "Correct!";
        document.querySelector("#q2Feedback").className = "bg-success text-white";
        document.querySelector("#markImg2").innerHTML = "<img src='img/confirmed.png' width=50px alt='confirmed checkmark'>";
        score += 10;
    }
    else {
        document.querySelector("#q2Feedback").innerHTML = "Incorrect...";
        document.querySelector("#q2Feedback").className = "bg-warning text-white";
        document.querySelector("#markImg2").innerHTML = "<img src='img/cancel.png' width=50px alt='xmark'>";
    }
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
} // gradeQuiz()

// isFormValid() checks if all answers have been interacted with (text input, radio buttons, etc.)
// if not, display specific error
function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML = "You need to answer question 1!";
    }
    return isValid;
} // isFormValid()