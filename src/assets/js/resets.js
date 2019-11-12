import { gameState } from "./gameStatus.js";
import tips from "./tips.js";
import deal, { tipsBtn } from "./deal.js";
import cutForDeal, { cutForDealBtn, dealBtn } from "./cutForDeal.js";
import { aCard } from "./cardDeck.js";
import { players } from "./generate.js";
import { allHands, dealtDeck, extraHand } from "./cardHands.js";
import {
  clearAnimalSets,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand
} from "./animalLogic.js";
import {
  changeEventListener,
  cardsFromExtraHand,
  cardsToExtraHand,
  playerOneCard
} from "./changeActivePlayer.js";

const clearTable = () => {
  gameState.activeRound = false;
  dealtDeck.length = 0;
  extraHand.length = 0;
  dealerHand.length = 0;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  allHands.length = 0;
  cardsFromExtraHand.length = 0;
  cardsToExtraHand.length = 0;
  aCard.forEach((card) => {
    card.classList.remove("is-active");
    card.textContent = "";
  });
  tipsBtn.removeEventListener("click", tips);
  dealBtn.addEventListener("click", deal);
  dealBtn.textContent = "Deal";
  //* Clear animal sets of card's seen
  if (gameState.animals) {
    clearAnimalSets();
  }
};

const resetGame = () => {
  clearTable();
  changeEventListener();
  gameState.activeGame = false;
  gameState.numCards = null;
  gameState.numPlayers = null;
  gameState.playerNames.length = 0;
  gameState.activeCards = playerOneCard;
  gameState.activePlayerNum = 1;
  gameState.animals = false;
  dealBtn.textContent = "Cut";
  dealBtn.removeEventListener("click", deal);
  cutForDealBtn.addEventListener("click", cutForDeal);
  players.length = 0;
};

export { clearTable as default, resetGame };
