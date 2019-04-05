// MANAGE CARDS IN HANDS
import {
  v,
  extraHand,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand,
  allHands
} from "./app.js";
import { players } from "./generate.js";
import { updateCardsSeen } from "./animalLogic.js";

const dealtDeck = [];

// Assign card objects to the hand arrays from the deck that shuffle() returned
const assignCardsToPlayers = shuffledDeck => {
  // Note: mutates the objects that shuffle(newDeck()) created inside an array
  // Select subset of shuffledDeck based on number of players
  // Note: cardObj/value is not used, but enables access to the index argument
  dealtDeck.push(...shuffledDeck.filter((cardObj, idx) => idx < v.numCards));

  // Set cardObj properties .cardPosition and .cardPlayerNum
  // --.cardPosition value based on order of dealtDeck card objects && numCards
  //    --With 15 cards, "leftOfDealer" is dealt the 1st, 5th, and 10th cards
  // --.cardPlayerNum value based on dealerPlayerNum value && numCards
  //    --"extraHand" is not a player hand, we set cardObj.cardPlayerNum = 0
  // Assign card objects to players' hand arrays and extra hand array
  let dealerPlayerNum;
  players.forEach(player => {
    if (player.position === "dealer") dealerPlayerNum = player.player;
  });
  switch (v.numCards) {
    case 15:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 5 || idx === 10) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayerNum =
            dealerPlayerNum === 4 ? 1 : dealerPlayerNum + 1;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 6 || idx === 11) {
          cardObj.cardPosition = "acrossFromDealerHand";
          cardObj.cardPlayerNum =
            dealerPlayerNum === 4
              ? 2
              : dealerPlayerNum === 3
              ? 1
              : dealerPlayerNum + 2;
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 7 || idx === 12) {
          cardObj.cardPosition = "rightOfDealerHand";
          cardObj.cardPlayerNum =
            dealerPlayerNum === 1 ? 4 : dealerPlayerNum - 1;
          rightOfDealerHand.push(cardObj);
        } else if (idx === 3 || idx === 8 || idx === 13) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayerNum = dealerPlayerNum;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          extraHand.push(cardObj);
          cardObj.cardPlayerNum = 0;
        }
      });
      allHands.push(
        extraHand,
        dealerHand,
        leftOfDealerHand,
        acrossFromDealerHand,
        rightOfDealerHand
      );
      break;
    case 12:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 4 || idx === 8) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayerNum =
            dealerPlayerNum === 3 ? 1 : dealerPlayerNum + 1;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 5 || idx === 9) {
          cardObj.cardPosition = "acrossFromDealerHand";
          cardObj.cardPlayerNum =
            dealerPlayerNum === 3 ? 2 : dealerPlayerNum === 2 ? 1 : 3;
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 6 || idx === 10) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayerNum = dealerPlayerNum;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          cardObj.cardPlayerNum = 0;
          extraHand.push(cardObj);
        }
      });
      allHands.push(
        extraHand,
        dealerHand,
        leftOfDealerHand,
        acrossFromDealerHand
      );
      break;
    default:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 3 || idx === 6) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayerNum = dealerPlayerNum === 1 ? 2 : 1;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 4 || idx === 7) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayerNum = dealerPlayerNum;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          cardObj.cardPlayerNum = 0;
          extraHand.push(cardObj);
        }
      });
      allHands.push(extraHand, dealerHand, leftOfDealerHand);
      break;
  }
  updateCardsSeen(extraHand);
};

export { assignCardsToPlayers as default, dealtDeck };
