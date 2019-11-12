import selectDeselectCard from "./assets/js/manageCards.js";
import exchangeCards from "./assets/js/exchangeCards.js";
import buy, { hold } from "./assets/js/buyHold.js";
import cutForDeal, { cutForDealBtn } from "./assets/js/cutForDeal.js";
import { extraCard } from "./assets/js/deal.js";
import addHuman, {
  removeHuman,
  addAnimal,
  removeAnimal,
  textPlayerName
} from "./assets/js/addPlayers.js";

//> Event Listeners
const addHumanBtn = document.querySelector(".addHumanBtn");
const removeHumanBtn = document.querySelector(".removeHumanBtn");
const addAnimalBtn = document.querySelector(".addAnimalBtn");
const removeAnimalBtn = document.querySelector(".removeAnimalBtn");

const exchangeBtn = document.querySelector(".exchangeBtn");
const buyBtn = document.querySelector(".buyBtn");
const holdBtn = document.querySelector(".holdBtn");

//* Selects/deselects extra hand's and current player's cards on screen
//* ...by adding an event listener to the extraCard NodeList...
extraCard.forEach((card) => card.addEventListener("click", selectDeselectCard));

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
