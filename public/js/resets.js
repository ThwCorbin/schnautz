// ///// RESET GAME/ROUND FUNCTIONS ////////////////////////////
import { v, eventsCards } from "./app.js";
import { players } from "./generate.js";

export const clearTable = () => {
  v.activeRound = false;
  extraHand.length = 0;
  dealerHand.length = 0;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  allHands.length = 0;
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;
  v.aCard.forEach(card => {
    card.classList.remove("is-active");
    card.textContent = "";
  });
};

const resetGame = () => {
  clearTable();
  eventsCards();
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
