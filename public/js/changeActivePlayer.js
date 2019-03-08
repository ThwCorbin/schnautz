// Change the active player
import {
  v,
  playerOneCard,
  playerTwoCard,
  playerThreeCard,
  playerFourCard,
  playerOneArea,
  playerTwoArea,
  playerThreeArea,
  playerFourArea,
  selectDeselectCard,
  eventsCards
} from "./app.js";
import { players } from "./generate.js";

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
      eventsCards())
    : v.activePlayerNum === 2 && v.numCards === 9
    ? // 2 players: player one (players[0]) follows player two (players[1])
      ((v.activePlayerNum = 1),
      (players[1].activePlayer = false),
      (players[0].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      eventsCards())
    : v.activePlayerNum === 2
    ? // 3/4 players: player three (players[2]) follows player two (players[1])
      ((v.activePlayerNum = 3),
      (players[1].activePlayer = false),
      (players[2].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerThreeArea.classList.add("active-area"),
      (v.activeCards = playerThreeCard),
      eventsCards())
    : v.activePlayerNum === 3 && v.numCards === 12
    ? // 3 players: player one (players[0]) follows player three (players[2])
      ((v.activePlayerNum = 1),
      (players[2].activePlayer = false),
      (players[0].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      eventsCards())
    : v.activePlayerNum === 3
    ? // 4 players: player four (players[3]) follows player three (players[2])
      ((v.activePlayerNum = 4),
      (players[2].activePlayer = false),
      (players[3].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerFourArea.classList.add("active-area"),
      (v.activeCards = playerFourCard),
      eventsCards())
    : // player one (players[0]) always follows player four (players[3])
      ((v.activePlayerNum = 1),
      (players[3].activePlayer = false),
      (players[0].activePlayer = true),
      playerFourArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (v.activeCards = playerOneCard),
      eventsCards());

  // Clear arrays for next player
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;

  // Check if current player used "buy" on last turn, if so reset to false
  if (players[idx].buyLastTurn) {
    players[idx].buyLastTurn = false;
  }

  // Update idx with new value of activePlayerNum
  idx = v.activePlayerNum - 1;
  // Check whether to endRound() if the next player used "hold" on last turn
  if (players[idx].holdLastTurn) {
    // Set all .holdLastTurn properties to false - prevents repeating endRound
    players.forEach(player => (player.holdLastTurn = false));
    endRound();
  }
};

export default changeActivePlayer;
