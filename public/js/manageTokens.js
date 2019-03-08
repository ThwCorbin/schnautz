import { p1Tokens, p2Tokens, p3Tokens, p4Tokens } from "./app.js";
import { players } from "./generate.js";

// Style cards and tokens variables

// Check players array for each player's token count and update DOM
const manageTokens = () => {
  players.forEach(player => {
    player.player === 1
      ? (p1Tokens.textContent = `${String(player.tokens)} tokens`)
      : player.player === 2
      ? (p2Tokens.textContent = `${String(player.tokens)} tokens`)
      : player.player === 3
      ? (p3Tokens.textContent = `${String(player.tokens)} tokens`)
      : (p4Tokens.textContent = `${String(player.tokens)} tokens`);
  });
};

export default manageTokens;
