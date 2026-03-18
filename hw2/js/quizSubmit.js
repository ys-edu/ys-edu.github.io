// listener for quizButton
document.querySelector("#quizButton").addEventListener("click", gradeQuiz);

// initialize global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ3Choices()
displayQ4Choices()
displayQ7Choices()
displayQ8Choices()

// displayQ3Choices() shuffles the choices available for Q3
function displayQ3Choices() {
    let q3ChoicesArray = ["Florida", "Arkansas", "California", "Virginia", "Wisconsin", "Massachusetts"];
    q3ChoicesArray = _.shuffle(q3ChoicesArray);
    for (let i = 0; i < q3ChoicesArray.length; i++) {
        document.querySelector("#q3Choices").innerHTML += `<input type="checkbox" name="q3" id="${q3ChoicesArray[i]}"
        value="${q3ChoicesArray[i]}"><label for="${q3ChoicesArray[i]}"> ${q3ChoicesArray[i]}</label><br>`;
    }
}

// displayQ4Choices() shuffles the choices available for Q4
function displayQ4Choices() {
    let q4ChoicesArray = ["Montana", "Texas", "Pennsylvania", "Wyoming", "New York", "Michigan"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id="${q4ChoicesArray[i]}"
        value="${q4ChoicesArray[i]}"><label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label><br>`;
    }
}

// displayQ7Choices() shuffles the choices available for Q7
function displayQ7Choices() {
    let q7ChoicesArray = ["Maine", "Kentucky", "Louisiana", "West Virginia", "California", "Tennessee"];
    q7ChoicesArray = _.shuffle(q7ChoicesArray);
    for (let i = 0; i < q7ChoicesArray.length; i++) {
        document.querySelector("#q7Choices").innerHTML += `<input type="radio" name="q7" id="${q7ChoicesArray[i]}"
        value="${q7ChoicesArray[i]}"><label for="${q7ChoicesArray[i]}"> ${q7ChoicesArray[i]}</label><br>`;
    }
}

// displayQ8Choices() shuffles the choices available for Q3
function displayQ8Choices() {
    let q8ChoicesArray = ["Maui", "Oahu", "Iowa", "Alaska", "Hawaii", "Ohio"];
    q8ChoicesArray = _.shuffle(q8ChoicesArray);
    for (let i = 0; i < q8ChoicesArray.length; i++) {
        document.querySelector("#q8Choices").innerHTML += `<input type="checkbox" name="q8" id="${q8ChoicesArray[i]}"
        value="${q8ChoicesArray[i]}"><label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]}</label><br>`;
    }
}

// gradeQuiz() checks the quiz responses and compares them to the correct answers
function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validation").innerHTML = "";
    if (!isFormValid()) {
        return;
    }

    // variables
    // reset score to 0 for each attempt
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("input[name=q7]:checked").value;
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("input[name=q10]:checked").value;
    console.log("Q1: "+q1Response+"Q2: "+q2Response+"Q4: "+q4Response+"Q5: "+q5Response+
                "Q6: "+q6Response+"Q7: "+q7Response+"Q9: "+q9Response+"Q10: "+q10Response);

    // grading Question 1:
    if (q1Response === "bear") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }
    // grading Question 2:
    if (q2Response === "q2-ak") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }
    // grading Question 3:
    if (document.querySelector("#Florida").checked && document.querySelector("#Virginia").checked &&
        document.querySelector("#Massachusetts").checked && !document.querySelector("#California").checked &&
        !document.querySelector("#Wisconsin").checked && !document.querySelector("#Arkansas").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }
    // grading Question 4:
    if (q4Response === "Wyoming") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }
    // grading Question 5:
    if (q5Response === "vermont") {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }
    // grading Question 6:
    if (q6Response === "arizona") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }
    // grading Question 7:
    if (q7Response === "Maine") {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }
    // grading Question 8:
    if (document.querySelector("#Oahu").checked && document.querySelector("#Maui").checked &&
        document.querySelector("#Hawaii").checked && !document.querySelector("#Ohio").checked &&
        !document.querySelector("#Alaska").checked && !document.querySelector("#Iowa").checked) {
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }
    // grading Question 9:
    if (q9Response === "q9-6") {
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }
    // grading Question 10:
    if (q10Response === "Yes") {
        rightAnswer(10);
    }
    else {
        wrongAnswer(10);
    }

    // displays this attempt's score
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    // if score is greater than 80 points, congratulates player
    if (score > 80) {
        document.querySelector("#totalScore").innerHTML += "! GREAT!";
        document.querySelector("#totalScore").className = "bg-success";
    }
    else {
        document.querySelector("#totalScore").className = "bg-danger";
    }
    // shows total attempts, and increments total in local web storage
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
    localStorage.setItem("total_attempts", attempts);
} // gradeQuiz()

// isFormValid() checks if all answers have been interacted with (text input, radio buttons, etc.)
// if not, display specific error
function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 1!";
    }
    if(document.querySelector("#q2").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 2!";
    }
    if(document.querySelector("input[name=q4]:checked").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 4!";
    }
    if(document.querySelector("#q5").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 5!";
    }
    if(document.querySelector("#q6").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 6!";
    }
    if(document.querySelector("input[name=q7]:checked").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 7!";
    }
    if(document.querySelector("#q9").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 9!";
    }
    if(document.querySelector("input[name=q10]:checked").value == "") {
        isValid = false;
        document.querySelector("#validation").innerHTML += "You need to answer Question 10!";
    }
    return isValid;
} // isFormValid()

// rightAnswer() provides feedback that the player is correct for this question
function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/confirmed.png' width=50px alt='confirmed checkmark'>";
    score += 10;
} // rightAnswer()

// wrongAnswer() provides feedback that the player is incorrect for this question
function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect...";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/cancel.png' width=50px alt='xmark'>";
} //wrongAnswer()