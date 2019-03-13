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
  num1to4Msg,
  cutForDealButton,
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
  v.numCards = null;
  v.numPlayers = null;
  v.playerNames = [];
  v.activeCards = playerOneCard;
  v.activePlayerNum = 1;
  dealButton.textContent = "Players?";
  cutForDealButton.textContent = "Cut for Dealer";
  num1to4Msg.textContent = "Add players";
  players.length = 0;
};

export { clearTable as default, resetGame };
