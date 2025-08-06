let userScore = document.querySelector("#user-score");
let compScore = document.querySelector("#comp-score");
let choices = document.querySelectorAll(".choice");
let back = document.querySelector(".back");
let history = document.querySelector(".history");
let show_history = document.querySelector(".show-history");
let decision = document.querySelector("#msg");
let history_container = document.querySelector(".history-container");

// Initializing variables
let us = 0; // User score
let cs = 0; // Computer score
let rounds = 0; // Track the number of rounds
let matches = 0; // Track matches within a round
let currentRoundDiv = null; // To track the current round's div

// Function to initialize a new round in the history
function initializeRound() {
    currentRoundDiv = document.createElement("div"); // Create a new round box
    currentRoundDiv.className = "round-box";
    currentRoundDiv.innerHTML = `Round # ${rounds + 1} ||| Total matches: ${matches} || You won: ${us} || Computer won: ${cs}`; // Add initial round details
    history_container.append(currentRoundDiv); // Append the round to the history container
    console.log(`New round initialized: Round ${rounds + 1}`);

}

// Event listeners for showing and hiding history
back.addEventListener("click", () => {
    history.style.visibility = "hidden";
    console.log("History hidden");
});

show_history.addEventListener("click", () => {
    history.style.visibility = "visible";
    console.log("History visible");
});

// Function to handle game logic and decisions
function takeDecision(userChoice, compChoice) {
    matches++; // Increment matches within the round

    // Initialize the first round if it hasn't started
    if (matches === 1 && rounds === 0) {
        initializeRound();
    }

    // Decision logic for the current match
    if (userChoice === compChoice) {
        decision.innerHTML = "Same choices: A TIE!";
    } else if (
        (userChoice === "rock" && compChoice === "paper") ||
        (userChoice === "paper" && compChoice === "scissors") ||
        (userChoice === "scissors" && compChoice === "rock")
    ) {
        compScore.innerHTML = `${++cs}`; // Increment computer's score
        decision.innerHTML = "Computer Wins!";
    } else {
        userScore.innerHTML = `${++us}`; // Increment user's score
        decision.innerHTML = "*_You Win_*";
    }

    // Update the ongoing round's summary
    if (currentRoundDiv) {
        currentRoundDiv.innerHTML = `Round # ${rounds + 1} ||| Total matches: ${matches} || You won: ${us} || Computer won: ${cs}`;
    }

    // Check if the round needs to end and a new one should begin
    if (matches >= 10) {
        console.log(`Round ${rounds + 1} has ended.`);
        matches = 0; // Reset match count
        us = 0; // Reset user score
        cs = 0; // Reset computer score
        userScore.innerHTML = `${0}`;
        compScore.innerHTML = `${0}`;
        // us=0;
        // cs=0;
        rounds++; // Increment round count
        initializeRound(); // Initialize the new round
    }
}

// Function to play the game
const playGame = (userChoice) => {
    console.log(`User choice: ${userChoice}`);
    let options = ["rock", "paper", "scissors"];
    let compChoice = Math.floor(Math.random() * 3);
    console.log(`Computer choice: ${options[compChoice]}`);
    let image_computer = document.querySelector(".computer-choice img");
    image_computer.src = `${options[compChoice]}.png`;
    takeDecision(userChoice, options[compChoice]);
};

// Event listeners for user choices
console.dir(choices);
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const id = choice.getAttribute("id");
        playGame(id);
    });
});
