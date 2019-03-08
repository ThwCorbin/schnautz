import changeDealer from "./changeDealer.js";
import { players } from "./generate.js";
import manageTokens from "./manageTokens.js";
import clearTable from "./resets.js";
import { beginEndGameButton, playersButton } from "./app.js";

// End the round
const endRound = (msgSchnautzFeuer, num31Or33) => {
  let message = ``;
  let messageScores = ``;
  let messageTokens = ``;
  let lowScore = 33;

  // Check which player has the lowest score and build scores message
  players.forEach(player => {
    lowScore = player.currentScore <= lowScore ? player.currentScore : lowScore;
    messageScores += `Player ${player.player} score: ${player.currentScore}
    `;
  });

  players.forEach(player => {
    if (player.currentScore === lowScore) {
      player.tokens -= 1;
      messageTokens += `Player ${player.player} loses a token
      `;
    }
  });
  // If 31 (Schnautz) or 33 (Feuer) points, update message
  if (num31Or33)
    message = `${msgSchnautzFeuer}!!!
  `;
  // Build the message
  message += `
    ${messageScores}
    ${messageTokens}
    `;
  alert(message);

  // Remove one token from lowest scoring player/players
  manageTokens();

  // Reset properties in players array of objects
  players.forEach(player => {
    player.currentScore = null;
    player.buyLastTurn = false;
    player.holdLastTurn = false;
  });
  clearTable();
  changeDealer();
  playersButton.textContent = "Deal";
  beginEndGameButton.textContent = "End Game";
};

export default endRound;
