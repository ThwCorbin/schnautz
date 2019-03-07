import { v, clearTable, players, playerText1 } from "./app.js";

// Test code
const sum = (a, b) => a + b;

// Generate players
const generatePlayers = () => {
  clearTable();
  for (let i = 1; i <= v.numPlayers; i++) {
    players.push({
      player: i,
      position:
        i === 1
          ? "dealer"
          : i === 2
          ? "leftOfDealer"
          : i === 3
          ? "acrossFromDealer"
          : "rightOfDealer",
      activePlayer: i === 1, // boolean - default is dealer
      buyLastTurn: false,
      holdLastTurn: false,
      tokens: 3,
      currentScore: null
    });
  }
  // Set initial dealer text
  playerText1.textContent = " Dealer ";
  // console.log(players);
};

export { generatePlayers as default, sum };
