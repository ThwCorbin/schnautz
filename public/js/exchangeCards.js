import {
  v,
  messageArea,
  extraHand,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand,
  cardsFromExtraHand,
  cardsToExtraHand,
  extraCard,
  playerOneCard,
  playerTwoCard,
  playerThreeCard,
  playerFourCard
} from "./app.js";
import updateScore, { check31Or33 } from "./updateScore.js";
import { styleBlackCards } from "./cardDeck.js";
import { players } from "./generate.js";
import { updateCardsSeen } from "./animalLogic.js";

// Exchange 1 or 3 cards from a player's hand with the extra hand
const exchangeCards = () => {
  // Note: mutates the objects that newDeck() created inside an array
  if (v.activeGame && v.activeRound) {
    // Note: All arrays below reference the same deck card objects

    // Bind the current player's position ("leftOfDealerHand", etc) to a variable
    let swapToCardPosition = cardsToExtraHand[0].cardPosition;
    // Bind the Nodelist of the current player's cards to a variable
    let playerNumberCard =
      v.activePlayerNum === 1
        ? playerOneCard // document.querySelectorAll(".playerOneCard")
        : v.activePlayerNum === 2
        ? playerTwoCard
        : v.activePlayerNum === 3
        ? playerThreeCard
        : playerFourCard;

    if (cardsToExtraHand.length === 1 && cardsFromExtraHand.length === 1) {
      // Check in the extraHand for the index of the selected card - bind to a variable
      let idxFromExtraHand = extraHand.indexOf(cardsFromExtraHand[0]);
      let idxFromExtraNode;
      let idxToExtraHand;
      let idxToPlayNode;

      // Switch .cardPosition property values e.g. "leftOfDealerHand" for "extraHand"
      cardsFromExtraHand[0].cardPosition = swapToCardPosition;
      cardsToExtraHand[0].cardPosition = "extraHand";
      // Switch .cardPlayerNum property values (extra is always 0)
      cardsFromExtraHand[0].cardPlayerNum = v.activePlayerNum;
      cardsToExtraHand[0].cardPlayerNum = 0;
      cardsFromExtraHand[0].selected = false;
      cardsToExtraHand[0].selected = false;

      // Replace one card object from extraHand with cardsToExtraHand[0]
      extraHand.splice(idxFromExtraHand, 1, cardsToExtraHand[0]);

      // Remove and replace one card object from the player's hand
      if (swapToCardPosition === "leftOfDealerHand") {
        idxToExtraHand = leftOfDealerHand.indexOf(cardsToExtraHand[0]);
        leftOfDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
      } else if (swapToCardPosition === "acrossFromDealerHand") {
        idxToExtraHand = acrossFromDealerHand.indexOf(cardsToExtraHand[0]);
        acrossFromDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
      } else if (swapToCardPosition === "rightOfDealerHand") {
        idxToExtraHand = rightOfDealerHand.indexOf(cardsToExtraHand[0]);
        rightOfDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
      } else {
        idxToExtraHand = dealerHand.indexOf(cardsToExtraHand[0]);
        dealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
      }
      // Use v.activePlayerNum to set current player's index in Players array
      let idxCurrentPlayer = v.activePlayerNum - 1;
      // Update cards animals have seen
      updateCardsSeen(cardsToExtraHand, players[idxCurrentPlayer].name);

      // Retrieve index from NodeList and modify textContent && classlist
      extraCard.forEach((card, idx) => {
        if (card.textContent === cardsFromExtraHand[0].card) {
          idxFromExtraNode = idx;
        }
      });
      extraCard[idxFromExtraNode].textContent = cardsToExtraHand[0].card;
      extraCard[idxFromExtraNode].classList.remove("is-active");

      // Retrieve index from NodeList and modify textContent && classlist
      playerNumberCard.forEach((card, idx) => {
        if (card.textContent === cardsToExtraHand[0].card) {
          idxToPlayNode = idx;
        }
      });
      playerNumberCard[idxToPlayNode].textContent = cardsFromExtraHand[0].card;
      playerNumberCard[idxToPlayNode].classList.remove("is-active");
      styleBlackCards();
      updateScore(v.activePlayerNum);
      check31Or33(v.activePlayerNum);
      // Check if current player used "buy" on last turn, if so reset to false
      if (players[idxCurrentPlayer].buyLastTurn) {
        players[idxCurrentPlayer].buyLastTurn = false;
      }
    } else if (
      cardsToExtraHand.length === 3 &&
      cardsFromExtraHand.length === 3
    ) {
      // Swap three cards to the extraHand
      extraHand.splice(0, 3, ...cardsToExtraHand);
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        extraCard[i].classList.remove("is-active");
        extraHand[i].cardPosition = "extraHand";
        extraHand[i].selected = false;
      }

      // Swap three cards to the current player's hand
      if (swapToCardPosition === "leftOfDealerHand") {
        leftOfDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerNumberCard[i].textContent = leftOfDealerHand[i].card;
          playerNumberCard[i].classList.remove("is-active");
          leftOfDealerHand[i].cardPosition = "leftOfDealerHand";
          leftOfDealerHand[i].selected = false;
        }
      } else if (swapToCardPosition === "acrossFromDealerHand") {
        acrossFromDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerNumberCard[i].textContent = acrossFromDealerHand[i].card;
          playerNumberCard[i].classList.remove("is-active");
          acrossFromDealerHand[i].cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand[i].selected = false;
        }
      } else if (swapToCardPosition === "rightOfDealerHand") {
        rightOfDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerNumberCard[i].classList.remove("is-active");
          playerNumberCard[i].textContent = rightOfDealerHand[i].card;
          rightOfDealerHand[i].cardPosition = "rightOfDealerHand";
          rightOfDealerHand[i].selected = false;
        }
      } else if (swapToCardPosition === "dealerHand") {
        dealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerNumberCard[i].classList.remove("is-active");
          playerNumberCard[i].textContent = dealerHand[i].card;
          dealerHand[i].cardPosition = "dealerHand";
          dealerHand[i].selected = false;
        }
      } else {
        messageArea.textContent = `Error: Unable to exchange three cards.`;
      }
      let idxCurrentPlayer = v.activePlayerNum - 1;
      // Update cards animals have seen
      updateCardsSeen(cardsToExtraHand, players[idxCurrentPlayer].name);

      styleBlackCards();
      updateScore(v.activePlayerNum);
      check31Or33(v.activePlayerNum);
      // Check if current player used "buy" on last turn, if so reset to false
      // ...subtract 1 from v.activePlayerNum to select the correct index
      if (players[v.activePlayerNum - 1].buyLastTurn) {
        players[v.activePlayerNum - 1].buyLastTurn = false;
      }
    } else {
      messageArea.textContent = `Error: Unable to exchange cards.`;
    }
  } else {
    messageArea.textContent = `Error: Game or round is not active.`;
  }
};

export default exchangeCards;
