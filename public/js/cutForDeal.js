import {
  v, // playersButton,
  cutForDealButton,
  dealButton
} from "./app.js";
// import newDeck, { shuffle, styleBlackCards } from "./cardDeck.js";
import generatePlayers from "./generate.js";
// import { resetGame } from "./resets.js";
import { getPlayerNames } from "./addPlayers.js";
import deal from "./deal.js";

// Begin play

const cutForDeal = () => {
  if (!v.activeGame && v.playerNames.length) {
    v.activeGame = true;
    getPlayerNames();
    // Temporary solution: "cut for the dealer"
    let randomIdx = Math.floor(Math.random() * v.numPlayers);
    console.log(`${v.playerNames[randomIdx]} is the dealer`);
    // Temporary solution: decide seating order starting with dealer
    let dealerToFront = v.playerNames.splice(randomIdx, 1);
    v.playerNames.unshift(dealerToFront);
    generatePlayers();
    // playersButton.textContent = "Deal";
    cutForDealButton.textContent = "Deal";
    // Removes cutForDealButton event listener and adds dealButton event listener
    cutForDealButton.removeEventListener("click", cutForDeal);
    dealButton.addEventListener("click", deal);
  } else if (!v.playerNames.length) {
    console.log("Add more players before cutting for the deal.");
  }
  // } else if (v.activeGame && cutForDealButton.textContent === "End Game") {
  //   cutForDealButton.textContent = "Sure?";
  // } else {
  //   resetGame();
  // }
};

export default cutForDeal;
