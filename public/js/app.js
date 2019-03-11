import changeNumPlayers from "./changeNumPlayers.js";
import beginEndGame from "./beginGame.js";
import deal from "./deal.js";
import selectDeselectCard from "./manageCards.js";
import exchangeCards from "./exchangeCards.js";
import buy, { hold } from "./buyHold.js";

// ///// VARIABLES /////////////////////////////////////////////

// DOM text and token variables
export const num1to4 = document.querySelector(".num1to4"); // Denotes number of players
export const p1Tokens = document.querySelector(".p1Tokens"); // Denotes tokens remaining
export const p2Tokens = document.querySelector(".p2Tokens");
export const p3Tokens = document.querySelector(".p3Tokens");
export const p4Tokens = document.querySelector(".p4Tokens");
export const playerText1 = document.querySelector(".dealerP1"); // Denotes current dealer
export const playerText2 = document.querySelector(".dealerP2");
export const playerText3 = document.querySelector(".dealerP3");
export const playerText4 = document.querySelector(".dealerP4");

// DOM card and card area variables
export const aCard = document.querySelectorAll(".aCard"); // all cards
export const extraCard = document.querySelectorAll(".extraCard"); // extra hand cards
export const playerOneCard = document.querySelectorAll(".playerOneCard");
export const playerTwoCard = document.querySelectorAll(".playerTwoCard");
export const playerThreeCard = document.querySelectorAll(".playerThreeCard");
export const playerFourCard = document.querySelectorAll(".playerFourCard");
export const playerOneArea = document.querySelector(".playerOneArea");
export const playerTwoArea = document.querySelector(".playerTwoArea");
export const playerThreeArea = document.querySelector(".playerThreeArea");
export const playerFourArea = document.querySelector(".playerFourArea");

// Default variables object
export const v = {
  numPlayers: null,
  numCards: 12,
  activeCards: playerOneCard,
  activePlayerNum: 1,
  activeGame: false,
  activeRound: false
};

// Hand variables - visualize players sitting around a card table
export const extraHand = []; // Array of extra hand's three card objects
export const dealerHand = []; // Array of dealer's hand's three card objects
export const leftOfDealerHand = []; // ...of player left of dealer...
export const acrossFromDealerHand = []; // ...of player across from dealer...
export const rightOfDealerHand = []; // ...of player right of dealer...
export const allHands = []; // Array of all hand arrays (of three card objects)
export const cardsFromExtraHand = []; // Card(s) selected to exchange
export const cardsToExtraHand = []; // Card(s) selected to exchange

// ///// EVENT LISTENERS ///////////////////////////////////////

export const playersButton = document.querySelector(".playersButton");
export const beginEndGameButton = document.querySelector(".beginEndGameButton");
export const dealButton = document.querySelector(".dealButton");
const exchangeButton = document.querySelector(".exchangeButton");
const buyButton = document.querySelector(".buyButton");
const holdButton = document.querySelector(".holdButton");

// Selects/deselects extra hand's and current player's cards on screen
// ...by adding an event listener to the extraCard NodeList...
extraCard.forEach(card => card.addEventListener("click", selectDeselectCard));
// ...and to the active player's cards' Nodelist (e.g. playerOneCard)
export const changeEventListener = () => {
  v.activeCards.forEach(card =>
    card.addEventListener("click", selectDeselectCard)
  );
};

// Wrapped event listeners in function to avoid "Test suite failed to run"
// TypeError: Cannot read property 'addEventListener' of null
const addListeners = () => {
  // Changes number of players and number of cards to deal
  playersButton.addEventListener("click", changeNumPlayers);
  // Begins a game: generates players
  // ...Ends a game
  beginEndGameButton.addEventListener("click", beginEndGame);
  // Deals: creates new card deck, shuffles, "deals" to hand arrays and DOM
  dealButton.addEventListener("click", deal);
  // Exchanges the current player's 1 or 3 cards with the extra hand card/cards
  exchangeButton.addEventListener("click", exchangeCards);
  // Buy: current player passes on turn
  buyButton.addEventListener("click", buy);
  // Hold: current player passes on turn and "call"s for the end of the round
  holdButton.addEventListener("click", hold);
};

window.addEventListener("DOMContentLoaded", addListeners);
