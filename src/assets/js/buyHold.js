import { v, messageArea, aCard } from "../../main.js";
import { players } from "./generate.js";
import updateScore, { check31Or33 } from "./updateScore.js";

// Current player skips turn but cannot skip two turns in a row
const buy = () => {
  let idx = v.activePlayerNum - 1;
  // check if player used a "buy" on last turn
  if (players[idx].buyLastTurn === true) {
    messageArea.innerHTML = `<h5>Player ${v.activePlayerNum} cannot buy this turn.</h5>`;
  } else {
    players[idx].buyLastTurn = true;
    aCard.forEach(card => card.classList.remove("is-active"));
    updateScore(v.activePlayerNum);
    check31Or33(v.activePlayerNum);
  }
};

// Current player skips turn and signals this round is ending
const hold = () => {
  let idx = v.activePlayerNum - 1;
  players[idx].holdLastTurn = true;
  aCard.forEach(card => card.classList.remove("is-active"));
  updateScore(v.activePlayerNum);
  check31Or33(v.activePlayerNum);
  // Other players have one more turn (but not current player)
};

export { buy as default, hold };
