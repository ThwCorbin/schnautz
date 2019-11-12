import { playerOneCard } from "./changeActivePlayer.js";

//> Default game state variables object
export const gameState = {
  activeGame: false,
  activeRound: false,
  activeCards: playerOneCard,
  activePlayerNum: 1,
  animals: false, //* true (if at least one animal/computer player is playing)
  numCards: null, //* 3 cards per player and 3 extra cards
  numPlayers: null,
  playerNames: []
};

export default gameState;
