import { v } from "./app.js";
import { myPetNames } from "./addPlayers.js";
import { players } from "./generate.js";

const patch = name => {
  return name;
};

let words = "dogs and cats forever";
patch(words);

const thinkLikeAnimal = () => {
  // v.activeGame;
  // myPetNames
  if (players.activePlayer) {
  }
};

export default thinkLikeAnimal;
