import {
  v,
  playerText1,
  playerText2,
  playerText3,
  playerText4,
  playerOneArea,
  playerTwoArea,
  playerThreeArea,
  playerFourArea
} from "./app.js";
import { players } from "./generate.js";

const changeDealer = () => {
  // Check numPlayers and use players[index] to update position properties
  if (v.numPlayers === 4) {
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
  } else if (v.numPlayers === 3) {
    let player3position = players[2].position;
    players[2].position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player3position;
    let holdText = playerText3.textContent;
    playerText3.textContent = playerText2.textContent;
    playerText2.textContent = playerText1.textContent;
    playerText1.textContent = holdText;
  } else if (v.numPlayers === 2) {
    let player2position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player2position;
    let holdText = playerText2.textContent;
    playerText2.textContent = playerText1.textContent;
    playerText1.textContent = holdText;
  }
  // Find the new "dealer" and set the property .activePlayer: true
  // ...set non-dealers' property .activePlayer: false
  // Set activePlayerNum to the "dealer"'s player number
  players.forEach(player => {
    player.position === "dealer"
      ? ((player.activePlayer = true), (v.activePlayerNum = player.player))
      : (player.activePlayer = false);
    player.buyLastTurn = false;
    player.holdLastTurn = false;
  });
  // Remove active-area from each classlist
  playerOneArea.classList.remove("active-area");
  playerTwoArea.classList.remove("active-area");
  playerThreeArea.classList.remove("active-area");
  playerFourArea.classList.remove("active-area");
};

export default changeDealer;
