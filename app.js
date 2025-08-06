let buttons = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector(".msg");
let historyContainer = document.querySelector(".history-container"); // History container
let history = document.querySelector(".history");
let show_history = document.querySelector(".showHistory");
let back = document.querySelector(".back");
// Event listeners for showing and hiding history
back.addEventListener("click", () => {
    history.style.visibility = "hidden";
    console.log("History hidden");
});
show_history.addEventListener("click", () => {
    history.style.visibility = "visible";
    console.log("History visible");
});

let userO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Adding event listeners to all boxes
buttons.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        if (userO) {
            box.innerHTML = "o";
            userO = false;
        } else {
            box.innerHTML = "x";
            userO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Function to check winner or tie
const checkWinner = () => {
    winPatterns.forEach((pat) => {
        let val1 = buttons[pat[0]].innerHTML;
        let val2 = buttons[pat[1]].innerHTML;
        let val3 = buttons[pat[2]].innerHTML;

        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3) {
                let winner = val1 === "x" ? "Player X" : "Player O";
                msg.innerText = `${winner} Wins!`;
                addToHistory(winner); // Add result to history
                disableAllButtons();
                setTimeout(() => {
                    resetBut();
                }, 3000); // 3 seconds delay
            }
        }
    });

    // Check for a tie if all boxes are filled
    if (count === 9) {
        msg.innerText = "It's a Tie!";
        addToHistory("Tie"); // Add tie result to history
        disableAllButtons();
        setTimeout(() => {
            resetBut();
        }, 3000); // 3 seconds delay
    }
};

// Function to disable all buttons
const disableAllButtons = () => {
    buttons.forEach((but) => {
        but.disabled = true;
    });
};

// Function to reset the board
const resetBut = () => {
    buttons.forEach((but) => {
        but.innerText = "";
        but.disabled = false; // Re-enable buttons
    });
    msg.innerText = "Play to Win!";
    count = 0;
    userO = true; // Start with Player O
};

// Function to add match result to history
const addToHistory = (result) => {
    let newEntry = document.createElement("div");
    newEntry.className = "history-entry";
    let player = result === "Tie" ? "Match Tied" : `${result} Won`;
    newEntry.innerText = `Match #${historyContainer.childElementCount + 1}: ${player}`;
    historyContainer.append(newEntry);
    historyContainer.scrollTop = historyContainer.scrollHeight; // Auto-scroll to the latest entry
};
