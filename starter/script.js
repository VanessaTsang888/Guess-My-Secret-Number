'use strict';

/******************************************************************************************************************************************************

Game: Guess My Secret Number:

How The Game Works:

Choose a number between 1 and 20. Type that into the input box and click the 'Check!' button.
If your number is too high, then a message will appear to the right advisin you of that. The same when you've entered a number that is too low.
Everytime you've entered an incorrect number, your score will be reduced by 1.
Once you've on the game, you can click the 'Play Again' button to play another game.
Once your score has reached 0, you will have lost the game. The aim is to reach a high score possible.

 ******************************************************************************************************************************************************/


// Define the number, a random number between 1 and 20 using the Math.random() function.
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// initial score:
let score = 20;
let highscore = 0;

// Set the message and put it into this display message function that we can use everywhere.
// Message: Between 1 and 20
const displayMessage = function (message) {
    document.querySelector('.message', '.between').textContent = message;
    // document.querySelector('.between').textContent = message;


}

document.querySelector('.check').addEventListener('click', function () {
    const guessNumber = Number(document.querySelector('.guess').value);
    // We can do some DOM manipulation here:
    console.log(guessNumber, typeof guessNumber);
    // Implement the game logic: is there a value, if not we print somethings as a response. if we get no response. Will get evaluated as a Boolean.

    // When there is no input    
    let isUserInputValid = checkInput(guessNumber);

    if (!isUserInputValid) {
        return;
    }

    // When player wins    
    if (guessNumber === secretNumber) {
        userEnteredCorrectGuess();
        // When guess is wrong or different to the secretNumber:
    } else if (guessNumber !== secretNumber) {
        userEnteredIncorrectGuess(guessNumber);
    }
});

const checkInput = function (userGuessNum) {
    if (!userGuessNum) {
        displayMessage('No number!');
        return false;
    }
    return true;
}

const userEnteredCorrectGuess = function () {
    // document.querySelector('.message').textContent = 'Correct Number!';
    displayMessage('Correct Number'); // cleaner and DRY.

    // Select that number. The class name is: number. We use textContent to set it, we use the assigment operator with the number we just calculated.
    document.querySelector('.number').textContent = secretNumber;

    // Change the background colour when the user guesses the corret number - when the player wins the game:
    document.querySelector('body').style.backgroundColor = '#962ed3';
    // Make the winning number box wider:
    document.querySelector('.number').style.width = '30rem';

    // The condition: if the score of the current game is greater than the highscore that we already had, then the highscore will become the new current score.
    if (score > highscore) {
        highscore = score;
        // display the new highscore:
        document.querySelector('.highscore').textContent = highscore;
    }
}

const userEnteredIncorrectGuess = function (userGuessNum) {
    if (score > 1) {
        // document.querySelector('.message').textContent = guess > secretNumber ? 'Too high!' : 'Too low!';
        displayMessage(userGuessNum > secretNumber ? 'Too high!' : 'Too low!');

        score--;
        document.querySelector('.score').textContent = score;
    } else {
        lostGame();
    }
}

const lostGame = function() {
        // document.querySelector('.message').textContent = 'You Lost The Game!';
        displayMessage('You Lost The Game!');
        document.querySelector('.score').textContent = 0;
}

// This is an anonymous handler function as it don't have a name.
// 1. Create the 'agin' class and attached a 'click' event handler.
// 2. Restore the initial values of the 'score' and 'secretNumber' variables:
// the score at the beginning of game is 20. Then I need a new secret number. Reassign the value to secretNumber (let not const).
// New number and reassign the variable.
// 3. Restore the initial conditions of the message, number, score and guess input fields for the user to play the game again without reloading the browser.
// The initail message is: Start guessing. 

document.querySelector('.again').addEventListener('click', function () {
    let score = 20;
    // let secretNumber = '?';
    // variable shadowing - i defined same variable twice in different scopes. so the global variable 'secretNumber' not available to use.
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    // document.querySelector('.message').textContent = 'Start Guessing Now...';
    displayMessage('Start Guessing Now...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});

