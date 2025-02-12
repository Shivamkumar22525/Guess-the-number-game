let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.getElementById('sbt');
const userInput = document.getElementById('enter');
const gusses = document.getElementById('gusses');
const count = document.getElementById('count');
const lowOrHigh = document.getElementById('lowOrHigh');
const footer = document.getElementById('footer');
const form = document.querySelector('form');

const start = document.createElement('button');
let preGusses = [];
let startGuess = 0;
let playGame = true;

if (playGame) {
    form.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const num = parseInt(userInput.value);
            validateguess(num);
        }
    });

    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const num = parseInt(userInput.value);
        validateguess(num);
    });
}

function validateguess(num) {
    if (isNaN(num)) {
        alert("Please enter a valid number");
        userInput.val = "";
    } else if (num < 1) {
        alert("Number should be greater than 0");
        userInput.val = '';
    } else if (num > 100) {
        alert("Number should be less than equals to 100");
        userInput.val = '';
    } else {
        preGusses.push(num);
        if (startGuess === 9) {
            if (num == randomNumber) {
                checkGuess(num);
                displayGuess(num);
            } else {
                displayGuess(num);
                displayMessage(`Game Over!!! Random number was ${randomNumber}`);
                endGame();
            }
        } else {
            displayGuess(num);
            checkGuess(num);
        }
    }
}

function checkGuess(num) {
    if (num === randomNumber) {
        displayMessage(`You guessed right`);
        endGame();
    } else if (num < randomNumber) {
        displayMessage(`Number is too low`);
    } else if (num > randomNumber) {
        displayMessage(`Number is too high`);
    }
}

function displayGuess(num) {
    userInput.value = '';
    gusses.innerHTML += (num + ", ");
    startGuess++;
    count.innerHTML = `${10 - startGuess}`;
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    start.classList.add('button');
    start.innerHTML = '<input type="button" id="newgame" value="New Game">';
    footer.appendChild(start);
    playGame = false;
    newGame();
}

function newGame() {
    const newButton = document.getElementById('newgame');
    newButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        preGusses = [];
        startGuess = 0;
        gusses.innerHTML = '';
        count.innerHTML = `${10 - startGuess}`;
        userInput.removeAttribute('disabled');
        footer.removeChild(start);
        displayMessage(" ");
        playGame = true;
    });
}
