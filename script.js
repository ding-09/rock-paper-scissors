// function to generate random computer choice 
function computerPlay() {
    const rpsOptions = ["Rock", "Paper", "Scissors"];
    let randomIndex = Math.floor(Math.random() * Math.floor(3));
    let computerChoice = rpsOptions[randomIndex];
    return computerChoice;
}

// function to determine the winner and display the result
function playRound(playerSelection, computerSelection) {
    let winner = determineWinner(playerSelection, computerSelection);
    return winner;
}

// helper function to determine the winner
function determineWinner(playerSelection, computerSelection) {
    let winner = "";
    switch (computerSelection) {
        case "Rock":
            if (playerSelection.toLowerCase() == "paper") {
                winner = "Player";
            } else if (playerSelection.toLowerCase() == "scissors") {
                winner = "Computer";
            } else {
                winner = null;
            }
            break;
        case "Paper":
            if (playerSelection.toLowerCase() == "rock") {
                winner = "Computer";
            } else if (playerSelection.toLowerCase() == "scissors") {
                winner = "Player";
            } else {
                winner = null;
            }
            break;
        case "Scissors":
            if (playerSelection.toLowerCase() == "rock") {
                winner = "Player";
            } else if (playerSelection.toLowerCase() == "paper") {
                winner = "Computer";
            } else {
                winner = null;
            }
            break;
    }
    return winner;
}


let buttons = document.getElementsByTagName('button');
let pInfo = document.getElementById('display-info');
let playerScore = document.getElementById('player-score');
let computerScore = document.getElementById('comp-score');
let computerChoices = document.getElementsByClassName('computer-choice');

function resetGame() {
    playerScore.textContent = "0";
    computerScore.textContent = "0";
}

function updateInfo(winner) {
    // display who won current round or a tie 
    let score = 0;
    if (winner == null) {
        pInfo.textContent = "Tie";
    } else {
        pInfo.textContent = `${winner} +1`;
        if (winner.includes("Player")) {
            score = Number(playerScore.textContent) + 1;
            playerScore.textContent = score.toString();
            // reset game when one side wins 
            if (score == 5) {
                pInfo.textContent = "Player wins!";
                resetGame();
            }
        } else {
            score = Number(computerScore.textContent) + 1;
            computerScore.textContent = score.toString();
            // reset game when one side wins 
            if (score == 5) {
                pInfo.textContent = "Computer wins!";
                resetGame();
            }
        }
    }
}

function removeComputerEffect() {
    for (i = 0; i < computerChoices.length; i++) {
        computerChoices[i].firstElementChild.classList.remove('addClickEffect');
    }
}

function addComputerEffect(computerSelection) {
    for (i = 0; i < computerChoices.length; i++) {
        let compId = computerChoices[i].firstElementChild.id;
        if (compId.includes(computerSelection.toLowerCase())) {
            computerChoices[i].firstElementChild.classList.add('addClickEffect');
        }
    }
}

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        // remove previous computer selection effect 
        removeComputerEffect();

        // store player selection 
        let playerSelection = e.target.id;

        // retrieve randomized computer selection 
        let computerSelection = computerPlay();
        addComputerEffect(computerSelection);

        // compare to see who wins 
        let winner = playRound(playerSelection, computerSelection);
        
        // display and update score 
        updateInfo(winner);
    });
}