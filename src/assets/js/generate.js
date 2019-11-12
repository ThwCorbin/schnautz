import { gameState } from "./gameStatus.js";
import manageTokens from "./manageTokens.js";
import clearTable from "./resets.js";
import { myPetNames } from "./addPlayers.js";
import { playerText1 } from "./changeDealer.js";

const players = [];

//> Generate players
const generatePlayers = () => {
  clearTable();
  for (let i = 1; i <= gameState.numPlayers; i++) {
    let idx = i - 1; //* zero-based
    players.push({
      player: i,
      name: gameState.playerNames[idx],
      position:
        i === 1
          ? "dealer"
          : i === 2
          ? "leftOfDealer"
          : i === 3
          ? "acrossFromDealer"
          : "rightOfDealer",
      activePlayer: i === 1, //* boolean - default is dealer
      animal: myPetNames.includes(gameState.playerNames[idx]), //* true if animal/computer
      buyLastTurn: false,
      holdLastTurn: false,
      tokens: 3,
      turns: 0,
      currentScore: null
    });
  }
  //* Set initial tokens text
  manageTokens();
  //* Set initial dealer text
  playerText1.textContent = " Dealer ";
};

export { generatePlayers as default, players };
