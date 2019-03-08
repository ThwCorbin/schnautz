import { v, num1to4, playersButton, beginEndGameButton } from "./app.js";
import generatePlayers from "./generate.js";
import { resetGame } from "./resets.js";

// Begin play

const beginEndGame = () => {
  if (!v.activeGame) {
    v.activeGame = true;
    v.numPlayers = Number(num1to4.textContent);
    generatePlayers();
    playersButton.textContent = "Deal";
    beginEndGameButton.textContent = "End Game";
  } else if (v.activeGame && beginEndGameButton.textContent === "End Game") {
    beginEndGameButton.textContent = "Sure?";
  } else {
    resetGame();
  }
};

export default beginEndGame;
