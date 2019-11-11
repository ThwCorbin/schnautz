import {
  v,
  messageArea,
  playerName1,
  playerName2,
  playerName3,
  playerName4,
  cutForDealBtn,
  dealBtn
} from "../../main.js";
// import newDeck, { shuffle, styleBlackCards } from "./cardDeck.js";
import generatePlayers, { players } from "./generate.js";
// import { resetGame } from "./resets.js";
import { getAnimal, myPetNames } from "./addPlayers.js";
import deal from "./deal.js";

// Begin play

const cutForDeal = () => {
  // Check if game !== active
  // Check if playerNames array has at least one human player
  if (
    !v.activeGame &&
    v.playerNames.length &&
    v.playerNames.some(player => myPetNames.includes(player) === false)
  ) {
    v.activeGame = true;
    // Check if we need an animal to play (we need two players minimum)
    getAnimal();

    // Cut for the dealer
    let randomIdx = Math.floor(Math.random() * v.numPlayers);
    messageArea.innerHTML = `<h5>${v.playerNames[randomIdx]} is the dealer</h5>`;
    // Decide seating order starting with dealer
    let dealerToFront = v.playerNames.splice(randomIdx, 1);
    // Note: dealerToFront is an ARRAY containing the one deleted element
    v.playerNames.unshift(dealerToFront[0]);

    // Assign player names to card table
    if (v.playerNames.length === 4) {
      playerName3.textContent = `${v.playerNames[2]}`;
      playerName4.textContent = `${v.playerNames[3]}`;
    } else if (v.playerNames.length === 3) {
      playerName3.textContent = `${v.playerNames[2]}`;
    }
    playerName1.textContent = `${v.playerNames[0]}`;
    playerName2.textContent = `${v.playerNames[1]}`;

    // Generate the array of player objects
    generatePlayers();

    // Removes cutForDealBtn event listener and adds dealBtn event listener
    cutForDealBtn.removeEventListener("click", cutForDeal);
    dealBtn.addEventListener("click", deal);
    dealBtn.textContent = "Deal";

    // Check if an animal needs to deal
    if (players[0].animal) {
      setTimeout(deal, 2000);
    }
    // } else if (!v.playerNames.length) {
  } else {
    messageArea.innerHTML = `<h5>Add a human player before cutting for the deal.</h5>`;
  }
};

export default cutForDeal;
