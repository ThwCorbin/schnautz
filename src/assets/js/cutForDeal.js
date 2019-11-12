import { gameState } from "./gameStatus.js";
//? import newDeck, { shuffle, styleBlackCards } from "./cardDeck.js";
import generatePlayers, { players } from "./generate.js";
//? import { resetGame } from "./resets.js";
import { getAnimal, myPetNames, messageArea } from "./addPlayers.js";
import deal from "./deal.js";

const playerName1 = document.querySelector(".playerName1"); //* Denotes tokens remaining
const playerName2 = document.querySelector(".playerName2");
const playerName3 = document.querySelector(".playerName3");
const playerName4 = document.querySelector(".playerName4");
const cutForDealBtn = document.querySelector(".cutForDealBtn");
const dealBtn = document.querySelector(".dealBtn");

//> Begin play
const cutForDeal = () => {
  //* Check if game !== active
  //* Check if playerNames array has at least one human player
  if (
    !gameState.activeGame &&
    gameState.playerNames.length &&
    gameState.playerNames.some(
      (player) => myPetNames.includes(player) === false
    )
  ) {
    gameState.activeGame = true;
    //* Check if we need an animal to play (we need two players minimum)
    getAnimal();

    //> Cut for the dealer
    let randomIdx = Math.floor(Math.random() * gameState.numPlayers);
    messageArea.innerHTML = `<h5>${gameState.playerNames[randomIdx]} is the dealer</h5>`;
    //* Decide seating order starting with dealer
    let dealerToFront = gameState.playerNames.splice(randomIdx, 1);
    //* DealerToFront is an array containing the one deleted element
    gameState.playerNames.unshift(dealerToFront[0]);

    //* Assign player names to card table
    if (gameState.playerNames.length === 4) {
      playerName3.textContent = `${gameState.playerNames[2]}`;
      playerName4.textContent = `${gameState.playerNames[3]}`;
    } else if (gameState.playerNames.length === 3) {
      playerName3.textContent = `${gameState.playerNames[2]}`;
    }
    playerName1.textContent = `${gameState.playerNames[0]}`;
    playerName2.textContent = `${gameState.playerNames[1]}`;

    //* Generate the array of player objects
    generatePlayers();

    //* Removes cutForDealBtn event listener and adds dealBtn event listener
    cutForDealBtn.removeEventListener("click", cutForDeal);
    dealBtn.addEventListener("click", deal);
    dealBtn.textContent = "Deal";

    //* Check if an animal needs to deal
    if (players[0].animal) {
      setTimeout(deal, 2000);
    }
    // // } else if (!gameState.playerNames.length) {
  } else {
    messageArea.innerHTML = `<h5>Add a human player before cutting for the deal.</h5>`;
  }
};

export { cutForDeal as default, cutForDealBtn, dealBtn };
//? export playerName1, playerName2, playerName3, playerName4,
