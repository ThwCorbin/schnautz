import { players } from "./generate.js";

//> DOM text and token variables
//* Denotes tokens remaining
const p1Tokens = document.querySelector(".p1Tokens");
const p2Tokens = document.querySelector(".p2Tokens");
const p3Tokens = document.querySelector(".p3Tokens");
const p4Tokens = document.querySelector(".p4Tokens");

//> Style cards and tokens variables
//> Check players array for each player's token count and update DOM
const manageTokens = () => {
  players.forEach((player) => {
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
//? export p1Tokens, p2Tokens, p3Tokens, p4Tokens
