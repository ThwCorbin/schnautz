import { players } from "./generate.js";
import { v, messageArea } from "../../main.js";
import manageTokens from "./manageTokens.js";
import clearTable from "./resets.js";
import changeDealer from "./changeDealer.js";
import { dealIfAnimal } from "./animalLogic.js";
// End the round
const endRound = (msgSchnautzFeuer, num31Or33) => {
  let message = ``;
  let messageScores = ``;
  let messageTokens = ``;
  let lowScore = 33;

  // Check which player has the lowest score and build scores message
  // Reset each players's turns property to 0
  players.forEach(player => {
    lowScore = player.currentScore <= lowScore ? player.currentScore : lowScore;
    messageScores += `<li>Player ${player.player} score: ${player.currentScore}</li>`;
    player.turns = 0;
  });
  players.forEach(player => {
    if (player.currentScore === lowScore) {
      player.tokens -= 1;
      messageTokens += `<li>Player ${player.player} loses a token</li>`;
    }
  });
  // If 31 (Schnautz) or 33 (Feuer) points, update message
  if (num31Or33) message = `<h5>${msgSchnautzFeuer}!!!</h5>`;
  // Build the message
  message += `<ul>${messageScores}</ul>
  
  <h5> Learner: </h5>
  <ul>${messageTokens}</ul>`;
  // Updated message text on screen
  messageArea.innerHTML = message;

  // Remove one token from lowest scoring player/players
  manageTokens();

  // Reset properties in players array of objects
  setTimeout(() => {
    messageArea.innerHTML = `<h5>Next dealer</h5>`;
    players.forEach(player => {
      player.currentScore = null;
      player.buyLastTurn = false;
      player.holdLastTurn = false;
    });
    clearTable();
    // Note: If a player's tokens < 0, remove that player before changeDealer()
    // Check if dealer is an animal--changeDealer passes dealer's player object
    dealIfAnimal(changeDealer());
  }, 4000);
};

export default endRound;
