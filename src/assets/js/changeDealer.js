import { gameState } from "./gameStatus.js";
import {
  playerOneArea,
  playerTwoArea,
  playerThreeArea,
  playerFourArea
} from "./changeActivePlayer.js";
import { players } from "./generate.js";

const playerText1 = document.querySelector(".dealerP1"); //* Denotes current dealer
const playerText2 = document.querySelector(".dealerP2");
const playerText3 = document.querySelector(".dealerP3");
const playerText4 = document.querySelector(".dealerP4");

const changeDealer = () => {
  let dealer;
  //* Check numPlayers and use players[index] to update position properties
  if (gameState.numPlayers === 4) {
    let player4position = players[3].position;
    players[3].position = players[2].position;
    players[2].position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player4position;
    let holdText = playerText4.textContent;
    playerText4.textContent = playerText3.textContent;
    playerText3.textContent = playerText2.textContent;
    playerText2.textContent = playerText1.textContent;
    playerText1.textContent = holdText;
  } else if (gameState.numPlayers === 3) {
    let player3position = players[2].position;
    players[2].position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player3position;
    let holdText = playerText3.textContent;
    playerText3.textContent = playerText2.textContent;
    playerText2.textContent = playerText1.textContent;
    playerText1.textContent = holdText;
  } else if (gameState.numPlayers === 2) {
    let player2position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player2position;
    let holdText = playerText2.textContent;
    playerText2.textContent = playerText1.textContent;
    playerText1.textContent = holdText;
  }

  //* Remove active-area from each classlist
  playerOneArea.classList.remove("active-area");
  playerTwoArea.classList.remove("active-area");
  playerThreeArea.classList.remove("active-area");
  playerFourArea.classList.remove("active-area");

  //* Prepare players array of objects for next round
  players.forEach((player) => {
    //* Reset buy and hold properties for next round
    player.buyLastTurn = false;
    player.holdLastTurn = false;
    //* Find the new "dealer"
    //*    -Set the property .activePlayer: true
    //*    -Set activePlayerNum to the "dealer"'s player number
    //*    -Bind this player object to the dealer variable
    //* Set non-dealers' property .activePlayer: false
    player.position === "dealer"
      ? ((player.activePlayer = true),
        (gameState.activePlayerNum = player.player),
        (dealer = player))
      : (player.activePlayer = false);
  });
  //* Return the dealer's player object, which we pass to dealIfAnimal()
  return dealer;
};

export { changeDealer as default, playerText1 };
//? export playerText2, playerText3, playerText4
