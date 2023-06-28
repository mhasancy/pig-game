'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // getting element by ID is the best way for the ID and use 'El' for the DOM element.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// If any variable to be used in local scope, must be defined as undefined or without a value
const init = function () {
  // Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // active score 1 or 2
  playing = true;

  score0El.textContent = 0; // here we declared it as number but JS will convert to string display in the UI
  score1El.textContent = 0;
  diceEL.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // changing active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // boolean doesn't need to write true or false, just write the variable name
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // when we doll the dice, we need new numbers

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`; // selecting the element and src attribute we can change the image

    // 3. Checked for rolled 1; if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if plyers score is 50
    if (scores[activePlayer] >= 50) {
      // finish the game
      diceEL.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next plyer
      switchPlayer();
    }
  }
});

//resetting game
btnNew.addEventListener('click', init);
