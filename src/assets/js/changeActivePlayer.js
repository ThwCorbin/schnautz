import selectDeselectCard from "./manageCards.js";
import endRound from "./endRound.js";
import thinkLikeAnimal from "./animalLogic.js";
import { extraCard } from "./deal.js";
import { gameState } from "./gameStatus.js";
import { messageArea } from "./addPlayers.js";
import { players } from "./generate.js";

const playerOneCard = document.querySelectorAll(".playerOneCard");
const playerTwoCard = document.querySelectorAll(".playerTwoCard");
const playerThreeCard = document.querySelectorAll(".playerThreeCard");
const playerFourCard = document.querySelectorAll(".playerFourCard");
const playerOneArea = document.querySelector(".playerOneArea");
const playerTwoArea = document.querySelector(".playerTwoArea");
const playerThreeArea = document.querySelector(".playerThreeArea");
const playerFourArea = document.querySelector(".playerFourArea");
const cardsFromExtraHand = []; //* Card(s) selected to exchange
const cardsToExtraHand = []; //* Card(s) selected to exchange

//> Selects/deselects extra hand's and current player's cards on screen
//* ...by adding an event listener to the extraCard NodeList...
extraCard.forEach((card) => card.addEventListener("click", selectDeselectCard));
//* ...and to the active player's cards' Nodelist (e.g. playerOneCard)
const changeEventListener = () => {
  gameState.activeCards.forEach((card) =>
    card.addEventListener("click", selectDeselectCard)
  );
};

//> Change the active player
const changeActivePlayer = () => {
  let idx = gameState.activePlayerNum - 1; //* Convert player number to zero-based index

  //* Remove event listener for the current player's three cards
  gameState.activeCards.forEach((card) =>
    card.removeEventListener("click", selectDeselectCard)
  );
  //* Update players array of player objects -- player one is players[0], etc
  //* Update player areas in DOM
  //* Add event listeners to the next player's three cards
  gameState.activePlayerNum === 1
    ? //* player two (players[1]) always follows player one (players[0])
      ((gameState.activePlayerNum = 2),
      (players[0].activePlayer = false),
      (players[1].activePlayer = true),
      playerOneArea.classList.remove("active-area"),
      playerTwoArea.classList.add("active-area"),
      (gameState.activeCards = playerTwoCard),
      changeEventListener())
    : gameState.activePlayerNum === 2 && gameState.numCards === 9
    ? //* 2 players: player one (players[0]) follows player two (players[1])
      ((gameState.activePlayerNum = 1),
      (players[1].activePlayer = false),
      (players[0].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (gameState.activeCards = playerOneCard),
      changeEventListener())
    : gameState.activePlayerNum === 2
    ? //* 3/4 players: player three (players[2]) follows player two (players[1])
      ((gameState.activePlayerNum = 3),
      (players[1].activePlayer = false),
      (players[2].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerThreeArea.classList.add("active-area"),
      (gameState.activeCards = playerThreeCard),
      changeEventListener())
    : gameState.activePlayerNum === 3 && gameState.numCards === 12
    ? //* 3 players: player one (players[0]) follows player three (players[2])
      ((gameState.activePlayerNum = 1),
      (players[2].activePlayer = false),
      (players[0].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (gameState.activeCards = playerOneCard),
      changeEventListener())
    : gameState.activePlayerNum === 3
    ? //* 4 players: player four (players[3]) follows player three (players[2])
      ((gameState.activePlayerNum = 4),
      (players[2].activePlayer = false),
      (players[3].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerFourArea.classList.add("active-area"),
      (gameState.activeCards = playerFourCard),
      changeEventListener())
    : //* player one (players[0]) always follows player four (players[3])
      ((gameState.activePlayerNum = 1),
      (players[3].activePlayer = false),
      (players[0].activePlayer = true),
      playerFourArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (gameState.activeCards = playerOneCard),
      changeEventListener());

  //* Clear message area
  messageArea.innerHTML = `<h5></h5>`;

  //* Clear arrays for next player
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;

  //* Update idx with new value of activePlayerNum
  idx = gameState.activePlayerNum - 1;
  //* Check whether to endRound() if the next player used "hold" on last turn
  if (players[idx].holdLastTurn) {
    //* Set all .holdLastTurn properties to false - prevents repeating endRound
    players.forEach((player) => (player.holdLastTurn = false));
    endRound();
    //* Check whether the new active player is an animal/computer
  } else if (players[idx].animal) {
    //* Pass this animal player object to animal/computer game logic
    thinkLikeAnimal(players[idx]);
  }
};

export {
  changeActivePlayer as default,
  changeEventListener,
  cardsFromExtraHand,
  cardsToExtraHand,
  playerOneArea,
  playerTwoArea,
  playerThreeArea,
  playerFourArea,
  playerOneCard,
  playerTwoCard,
  playerThreeCard,
  playerFourCard
};
