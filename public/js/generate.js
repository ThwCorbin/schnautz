import { v, playerText1 } from "./app.js";
import { myPetNames } from "./addPlayers.js";
import manageTokens from "./manageTokens.js";
import clearTable from "./resets.js";

const players = [];

// Generate players
const generatePlayers = () => {
  clearTable();
  for (let i = 1; i <= v.numPlayers; i++) {
    players.push({
      player: i,
      name: v.playerNames[i],
      position:
        i === 1
          ? "dealer"
          : i === 2
          ? "leftOfDealer"
          : i === 3
          ? "acrossFromDealer"
          : "rightOfDealer",
      activePlayer: i === 1, // boolean - default is dealer
      animal: myPetNames.includes(v.playerNames[i]), // true if animal/computer
      buyLastTurn: false,
      holdLastTurn: false,
      tokens: 3,
      currentScore: null
    });
  }
  // Set initial tokens text
  manageTokens();
  // Set initial dealer text
  playerText1.textContent = " Dealer ";
};

export { generatePlayers as default, players };
