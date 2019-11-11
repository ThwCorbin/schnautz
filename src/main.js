console.log("Hiya luna!");
import addHuman, {
  removeHuman,
  addAnimal,
  removeAnimal
} from "./assets/js/addPlayers.js";
import cutForDeal from "./assets/js/cutForDeal.js";
import selectDeselectCard from "./assets/js/manageCards.js";
import exchangeCards from "./assets/js/exchangeCards.js";
import buy, { hold } from "./assets/js/buyHold.js";

//> Variables

//> DOM text and token variables
export const messageArea = document.querySelector(".messageArea");
export const textPlayerName = document.querySelector(".textPlayerName");
export const playerName1 = document.querySelector(".playerName1"); //* Denotes tokens remaining
export const playerName2 = document.querySelector(".playerName2");
export const playerName3 = document.querySelector(".playerName3");
export const playerName4 = document.querySelector(".playerName4");
export const p1Tokens = document.querySelector(".p1Tokens"); //* Denotes tokens remaining
export const p2Tokens = document.querySelector(".p2Tokens");
export const p3Tokens = document.querySelector(".p3Tokens");
export const p4Tokens = document.querySelector(".p4Tokens");
export const playerText1 = document.querySelector(".dealerP1"); //* Denotes current dealer
export const playerText2 = document.querySelector(".dealerP2");
export const playerText3 = document.querySelector(".dealerP3");
export const playerText4 = document.querySelector(".dealerP4");

//> DOM card and card area variables
export const aCard = document.querySelectorAll(".aCard"); //* all cards
export const extraCard = document.querySelectorAll(".extraCard"); //* extra hand cards
export const playerOneCard = document.querySelectorAll(".playerOneCard");
export const playerTwoCard = document.querySelectorAll(".playerTwoCard");
export const playerThreeCard = document.querySelectorAll(".playerThreeCard");
export const playerFourCard = document.querySelectorAll(".playerFourCard");
export const playerOneArea = document.querySelector(".playerOneArea");
export const playerTwoArea = document.querySelector(".playerTwoArea");
export const playerThreeArea = document.querySelector(".playerThreeArea");
export const playerFourArea = document.querySelector(".playerFourArea");

//> Default variables object
export const v = {
  activeGame: false,
  activeRound: false,
  activeCards: playerOneCard,
  activePlayerNum: 1,
  animals: false, //* true (if at least one animal/computer player is playing)
  numCards: null, //* 3 cards per player and 3 extra cards
  numPlayers: null,
  playerNames: []
};

//> Hand variables - visualize players sitting around a card table
export const extraHand = []; //* Array of extra hand's three card objects
export const dealerHand = []; //* Array of dealer's hand's three card objects
export const leftOfDealerHand = []; //*...of player left of dealer...
export const acrossFromDealerHand = []; //* ...of player across from dealer...
export const rightOfDealerHand = []; //* ...of player right of dealer...
export const allHands = []; //* Array of all hand arrays (of three card objects)
export const cardsFromExtraHand = []; //* Card(s) selected to exchange
export const cardsToExtraHand = []; //* Card(s) selected to exchange

//> Event Listeners
export const addHumanBtn = document.querySelector(".addHumanBtn");
export const removeHumanBtn = document.querySelector(".removeHumanBtn");
export const addAnimalBtn = document.querySelector(".addAnimalBtn");
export const removeAnimalBtn = document.querySelector(".removeAnimalBtn");
export const cutForDealBtn = document.querySelector(".cutForDealBtn");
export const dealBtn = document.querySelector(".dealBtn");
export const tipsBtn = document.querySelector(".tipsBtn");
const exchangeBtn = document.querySelector(".exchangeBtn");
const buyBtn = document.querySelector(".buyBtn");
const holdBtn = document.querySelector(".holdBtn");

//* Selects/deselects extra hand's and current player's cards on screen
//* ...by adding an event listener to the extraCard NodeList...
extraCard.forEach(card => card.addEventListener("click", selectDeselectCard));
//* ...and to the active player's cards' Nodelist (e.g. playerOneCard)
export const changeEventListener = () => {
  v.activeCards.forEach(card =>
    card.addEventListener("click", selectDeselectCard)
  );
};

//* Wrapped event listeners in function to avoid "Test suite failed to run"
//* TypeError: Cannot read property 'addEventListener' of null
const addListeners = () => {
  //* Add or remove players
  textPlayerName.addEventListener("submit", addHuman);
  addHumanBtn.addEventListener("click", addHuman);
  removeHumanBtn.addEventListener("click", removeHuman);
  addAnimalBtn.addEventListener("click", addAnimal);
  removeAnimalBtn.addEventListener("click", removeAnimal);
  //* Begins a game: generates players
  cutForDealBtn.addEventListener("click", cutForDeal);
  //* Exchanges the current player's 1 or 3 cards with the extra hand card/cards
  exchangeBtn.addEventListener("click", exchangeCards);
  //* Buy: current player passes on turn
  buyBtn.addEventListener("click", buy);
  //* Hold: current player passes on turn and "call"s for the end of the round
  holdBtn.addEventListener("click", hold);
};

window.addEventListener("DOMContentLoaded", addListeners);
