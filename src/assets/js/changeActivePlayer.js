// Change the active player
import {
  v,
  changeEventListener,
  cardsFromExtraHand,
  cardsToExtraHand,
  playerOneCard,
  playerTwoCard,
  playerThreeCard,
  playerFourCard,
  playerOneArea,
  playerTwoArea,
  playerThreeArea,
  playerFourArea,
  messageArea
} from "../../main.js";
import { players } from "./generate.js";
import selectDeselectCard from "./manageCards.js";
import endRound from "./endRound.js";
import thinkLikeAnimal from "./animalLogic.js";

const changeActivePlayer = () => {
  let idx = v.activePlayerNum - 1; // Convert player number to zero-based index

  // Remove event listener for the current player's three cards
  v.activeCards.forEach(card =>
    card.removeEventListener("click", selectDeselectCard)
  );
  // Update players array of player objects -- player one is players[0], etc
  // Update player areas in DOM
  // Add event listeners to the next player's three cards
  v.activePlayerNum === 1
    ? // player two (players[1]) always follows player one (players[0])
      ((v.activePlayerNum = 2),
      (players[0].activePlayer = false),
      (players[1].activePlayer = true),
      playerOneArea.classList.remove("active-area"),
      playerTwoArea.classList.add("active-area"),
      (v.activeCards = playerTwoCard),
      changeEventListener())
    : v.activePlayerNum === 2 && v.numCards === 9
    ? // 2 players: player one (players[0]) follows player two (players[1])
      ((v.activePlayerNum = 1),
      (players[1].activePlayer = false),
      (players[0].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      changeEventListener())
    : v.activePlayerNum === 2
    ? // 3/4 players: player three (players[2]) follows player two (players[1])
      ((v.activePlayerNum = 3),
      (players[1].activePlayer = false),
      (players[2].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerThreeArea.classList.add("active-area"),
      (v.activeCards = playerThreeCard),
      changeEventListener())
    : v.activePlayerNum === 3 && v.numCards === 12
    ? // 3 players: player one (players[0]) follows player three (players[2])
      ((v.activePlayerNum = 1),
      (players[2].activePlayer = false),
      (players[0].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      changeEventListener())
    : v.activePlayerNum === 3
    ? // 4 players: player four (players[3]) follows player three (players[2])
      ((v.activePlayerNum = 4),
      (players[2].activePlayer = false),
      (players[3].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerFourArea.classList.add("active-area"),
      (v.activeCards = playerFourCard),
      changeEventListener())
    : // player one (players[0]) always follows player four (players[3])
      ((v.activePlayerNum = 1),
      (players[3].activePlayer = false),
      (players[0].activePlayer = true),
      playerFourArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      changeEventListener());

  // Clear message area
  messageArea.innerHTML = `<h5></h5>`;

  // Clear arrays for next player
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;

  // Update idx with new value of activePlayerNum
  idx = v.activePlayerNum - 1;
  // Check whether to endRound() if the next player used "hold" on last turn
  if (players[idx].holdLastTurn) {
    // Set all .holdLastTurn properties to false - prevents repeating endRound
    players.forEach(player => (player.holdLastTurn = false));
    endRound();
    // Check whether the new active player is an animal/computer
  } else if (players[idx].animal) {
    // Pass this animal player object to animal/computer game logic
    thinkLikeAnimal(players[idx]);
  }
};

export default changeActivePlayer;
