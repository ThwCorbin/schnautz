import { v, num1to4 } from "./app.js";

// Change number of players and number of cards to deal
const changeNumPlayers = () => {
  if (!v.activeGame) {
    num1to4.textContent === "4"
      ? ((num1to4.textContent = "3"), (v.numCards = 12))
      : num1to4.textContent === "3"
      ? ((num1to4.textContent = "2"), (v.numCards = 9))
      : ((num1to4.textContent = "4"), (v.numCards = 15));
  }
};

export default changeNumPlayers;
