import {
  v,
  dealBtn,
  tipsBtn,
  extraHand,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand,
  extraCard,
  playerOneCard,
  playerTwoCard,
  playerThreeCard,
  playerFourCard
} from "./app.js";
import { players } from "./generate.js";
import newDeck, { shuffle, styleBlackCards } from "./cardDeck.js";
import assignCardsToPlayers from "./cardHands.js";
import updateScore, { check31Or33 } from "./updateScore.js";
import tips from "./tips.js";

// Deal card objects
const deal = () => {
  if (v.activeGame && v.activeRound === false) {
    v.activeRound = true;
    // Removes dealBtn event listener and adds tipsBtn event listener
    dealBtn.removeEventListener("click", deal);
    tipsBtn.addEventListener("click", tips);
    tipsBtn.textContent = "Tips";

    // Generate a deck of cards, shuffle it, and assign ("deal") a subset of
    // the card objects to the extra hand array and the player hand arrays
    assignCardsToPlayers(shuffle(newDeck()));
    // "Deal" card values to the screen based on the number of cards
    if (v.numCards === 15) {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        players[0].position === "dealer"
          ? (playerOneCard[i].textContent = dealerHand[i].card)
          : players[0].position === "leftOfDealer"
          ? (playerOneCard[i].textContent = leftOfDealerHand[i].card)
          : players[0].position === "acrossFromDealer"
          ? (playerOneCard[i].textContent = acrossFromDealerHand[i].card)
          : (playerOneCard[i].textContent = rightOfDealerHand[i].card);
        players[1].position === "dealer"
          ? (playerTwoCard[i].textContent = dealerHand[i].card)
          : players[1].position === "leftOfDealer"
          ? (playerTwoCard[i].textContent = leftOfDealerHand[i].card)
          : players[1].position === "acrossFromDealer"
          ? (playerTwoCard[i].textContent = acrossFromDealerHand[i].card)
          : (playerTwoCard[i].textContent = rightOfDealerHand[i].card);
        players[2].position === "dealer"
          ? (playerThreeCard[i].textContent = dealerHand[i].card)
          : players[2].position === "leftOfDealer"
          ? (playerThreeCard[i].textContent = leftOfDealerHand[i].card)
          : players[2].position === "acrossFromDealer"
          ? (playerThreeCard[i].textContent = acrossFromDealerHand[i].card)
          : (playerThreeCard[i].textContent = rightOfDealerHand[i].card);
        players[3].position === "dealer"
          ? (playerFourCard[i].textContent = dealerHand[i].card)
          : players[3].position === "leftOfDealer"
          ? (playerFourCard[i].textContent = leftOfDealerHand[i].card)
          : players[3].position === "acrossFromDealer"
          ? (playerFourCard[i].textContent = acrossFromDealerHand[i].card)
          : (playerFourCard[i].textContent = rightOfDealerHand[i].card);
      }
    } else if (v.numCards === 12) {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        players[0].position === "dealer"
          ? (playerOneCard[i].textContent = dealerHand[i].card)
          : players[0].position === "leftOfDealer"
          ? (playerOneCard[i].textContent = leftOfDealerHand[i].card)
          : (playerOneCard[i].textContent = acrossFromDealerHand[i].card);
        players[1].position === "dealer"
          ? (playerTwoCard[i].textContent = dealerHand[i].card)
          : players[1].position === "leftOfDealer"
          ? (playerTwoCard[i].textContent = leftOfDealerHand[i].card)
          : (playerTwoCard[i].textContent = acrossFromDealerHand[i].card);
        players[2].position === "dealer"
          ? (playerThreeCard[i].textContent = dealerHand[i].card)
          : players[2].position === "leftOfDealer"
          ? (playerThreeCard[i].textContent = leftOfDealerHand[i].card)
          : (playerThreeCard[i].textContent = acrossFromDealerHand[i].card);
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        players[0].position === "dealer"
          ? (playerOneCard[i].textContent = dealerHand[i].card)
          : (playerOneCard[i].textContent = leftOfDealerHand[i].card);
        players[1].position === "dealer"
          ? (playerTwoCard[i].textContent = dealerHand[i].card)
          : (playerTwoCard[i].textContent = leftOfDealerHand[i].card);
      }
    }
    // Spades and clubs on screen should be black (default is red)
    styleBlackCards();
    // Update scores to avoid currentScore: null on an early Schnautz/Feuer
    players.forEach(player => updateScore(player.player));
    // Check if the dealer dealt a Schnautz/Feuer to any player
    check31Or33();
  }
};

export default deal;
