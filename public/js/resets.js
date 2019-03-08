// ///// RESET GAME/ROUND FUNCTIONS ////////////////////////////
import {
  v,
  changeEventListener,
  playerOneCard,
  extraHand,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand,
  allHands,
  cardsFromExtraHand,
  cardsToExtraHand,
  num1to4,
  beginEndGameButton,
  dealButton,
  aCard
} from "./app.js";
import { players } from "./generate.js";
import { dealtDeck } from "./cardHands.js";

export const clearTable = () => {
  v.activeRound = false;
  dealtDeck.length = 0;
  extraHand.length = 0;
  dealerHand.length = 0;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  allHands.length = 0;
  cardsFromExtraHand.length = 0;
  cardsToExtraHand.length = 0;
  aCard.forEach(card => {
    card.classList.remove("is-active");
    card.textContent = "";
  });
};

const resetGame = () => {
  clearTable();
  changeEventListener();
  v.activeGame = false;
  players.length = 0;
  v.activePlayerNum = 1;
  v.activeCards = playerOneCard;
  dealButton.textContent = "Players?";
  beginEndGameButton.textContent = "Start";
  num1to4.textContent = 3;
  v.numCards = 12;
};

export { clearTable as default, resetGame };
