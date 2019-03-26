import {
  v,
  messageArea,
  playerName1,
  playerName2,
  playerName3,
  playerName4,
  cutForDealBtn,
  dealBtn
} from "./app.js";
// import newDeck, { shuffle, styleBlackCards } from "./cardDeck.js";
import generatePlayers from "./generate.js";
// import { resetGame } from "./resets.js";
import { getAnimal } from "./addPlayers.js";
import deal from "./deal.js";

// Begin play

const cutForDeal = () => {
  if (!v.activeGame && v.playerNames.length) {
    v.activeGame = true;
    // Check if we need an animal to play (we need two players minimum)
    getAnimal();

    // Temporary solution: "cut for the dealer"
    let randomIdx = Math.floor(Math.random() * v.numPlayers);
    messageArea.textContent = `${v.playerNames[randomIdx]} is the dealer`;
    // Temporary solution: decide seating order starting with dealer
    let dealerToFront = v.playerNames.splice(randomIdx, 1);
    v.playerNames.unshift(dealerToFront);

    // Assign player names to card table
    if (v.playerNames.length === 4) {
      playerName3.innerHTML = `${v.playerNames[2]}`;
      playerName4.innerHTML = `${v.playerNames[3]}`;
    } else if (v.playerNames.length === 3) {
      playerName3.innerHTML = `${v.playerNames[2]}`;
    }
    playerName1.innerHTML = `${v.playerNames[0]}`;
    playerName2.innerHTML = `${v.playerNames[1]}`;

    // Generate the array of player objects
    generatePlayers();

    // Removes cutForDealBtn event listener and adds dealBtn event listener
    cutForDealBtn.removeEventListener("click", cutForDeal);
    dealBtn.addEventListener("click", deal);
    cutForDealBtn.textContent = "Deal";
  } else if (!v.playerNames.length) {
    messageArea.textContent = `Add more players before cutting for the deal.`;
  }
};

export default cutForDeal;
