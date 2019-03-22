import { messageArea, allHands } from "./app.js";
import { players } from "./generate.js";
import changeActivePlayer from "./changeActivePlayer.js";
import endRound from "./endRound.js";

// Update player scores and check for 31 (Schnautz) or 33 (Feuer)
const updateScore = playerNum => {
  let idxPlayers = playerNum - 1; // Convert player number to zero-based index
  let idxAllHands; // Set using players[idxPlayers].position property
  // Note: allHands[0] is extraHand, allHands[1] is dealerHand, etc
  players[idxPlayers].position === "dealer"
    ? (idxAllHands = 1)
    : players[idxPlayers].position === "leftOfDealer"
    ? (idxAllHands = 2)
    : players[idxPlayers].position === "acrossFromDealer"
    ? (idxAllHands = 3)
    : (idxAllHands = 4);

  // .points property stores point value of A(11),K(10),Q(10),J(10),10,9,8,7

  // If all three cards are the same suit, add the points
  allHands[idxAllHands][0].suit === allHands[idxAllHands][1].suit &&
  allHands[idxAllHands][0].suit === allHands[idxAllHands][2].suit
    ? (players[idxPlayers].currentScore =
        allHands[idxAllHands][0].points +
        allHands[idxAllHands][1].points +
        allHands[idxAllHands][2].points)
    : // If two cards are the same suit, add the points
    allHands[idxAllHands][0].suit === allHands[idxAllHands][1].suit
    ? (players[idxPlayers].currentScore =
        allHands[idxAllHands][0].points + allHands[idxAllHands][1].points)
    : allHands[idxAllHands][0].suit === allHands[idxAllHands][2].suit
    ? (players[idxPlayers].currentScore =
        allHands[idxAllHands][0].points + allHands[idxAllHands][2].points)
    : allHands[idxAllHands][1].suit === allHands[idxAllHands][2].suit
    ? (players[idxPlayers].currentScore =
        allHands[idxAllHands][1].points + allHands[idxAllHands][2].points)
    : // If all three cards are aces, the score is 33
    allHands[idxAllHands][0].rank === "A" &&
      allHands[idxAllHands][1].rank === "A" &&
      allHands[idxAllHands][2].rank === "A"
    ? (players[idxPlayers].currentScore = 33)
    : // If all three cards are tens, the score is 30
    allHands[idxAllHands][0].rank === "10" &&
      allHands[idxAllHands][1].rank === "10" &&
      allHands[idxAllHands][2].rank === "10"
    ? (players[idxPlayers].currentScore = 30)
    : // If all three cards are the same rank, the score is 30.5
    allHands[idxAllHands][0].rank === allHands[idxAllHands][1].rank &&
      allHands[idxAllHands][0].rank === allHands[idxAllHands][2].rank
    ? (players[idxPlayers].currentScore = 30.5)
    : // Otherwise, the score is the point value of the highest card
    allHands[idxAllHands][0].points >= allHands[idxAllHands][1].points &&
      allHands[idxAllHands][0].points >= allHands[idxAllHands][2].points
    ? (players[idxPlayers].currentScore = allHands[idxAllHands][0].points)
    : allHands[idxAllHands][0].points >= allHands[idxAllHands][1].points &&
      allHands[idxAllHands][0].points <= allHands[idxAllHands][2].points
    ? (players[idxPlayers].currentScore = allHands[idxAllHands][2].points)
    : allHands[idxAllHands][0].points <= allHands[idxAllHands][1].points &&
      allHands[idxAllHands][1].points >= allHands[idxAllHands][2].points
    ? (players[idxPlayers].currentScore = allHands[idxAllHands][1].points)
    : (players[idxPlayers].currentScore = allHands[idxPlayers][2].points);
  messageArea.textContent = `Player ${players[idxPlayers].player} score: ${
    players[idxPlayers].currentScore
  }`;
};

const check31Or33 = (playerNum = null) => {
  let idxPlayers = playerNum - 1; // Convert player number to zero-based index
  let playerHas31 = [];
  // If a player's score is 31 or 33, the round ends immediately
  // Check if any players have been dealt 33 or 31
  if (playerNum === null) {
    players.forEach(player => {
      if (player.currentScore === 33) {
        endRound("Feuer", 33);
      } else if (player.currentScore === 31) {
        playerHas31.push(player.player);
        console.log(`Player ${player.player} has 31!`);
      }
    });
    // If any player has 31, end the round, if not change the active player
    playerHas31.length > 0 ? endRound("Schnautz", 31) : changeActivePlayer();

    // else if (playerNum !== null) check if a player has 33 or 31
  } else if (players[idxPlayers].currentScore === 33) {
    endRound("Feuer", 33);
  } else if (players[idxPlayers].currentScore === 31) {
    endRound("Schnautz", 31);
    // if (playerNum !== null) and no player has 33 or 31
  } else {
    changeActivePlayer();
  }
};

export { updateScore as default, check31Or33 };
