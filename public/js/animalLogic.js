import { messageArea } from "./app.js";
import { hold } from "./buyHold.js";

let catSawCards;
// let dogSawCards;
// let gatorSawCards;

const updateCardsSeen = (cards, animal) => {
  // animal === "cat" ? console.log("cat") : catSawCards.add(cards);
};

// changeActivePlayer() passes animal player object
// Animal decides whether to exchange, buy, or hold this turn
const thinkLikeAnimal = animal => {
  if (animal.currentScore >= 22) {
    messageArea.innerHTML = `<h5>${animal.name} holds.`;
    hold();
  }
};

// Check if dealer is an animal--changeDealer passes dealer's player object
const dealIfAnimal = dealer => {
  // code
  console.log(dealer);
};

export { thinkLikeAnimal as default, dealIfAnimal, updateCardsSeen };
