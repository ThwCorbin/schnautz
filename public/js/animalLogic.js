import { messageArea } from "./app.js";
import { hold } from "./buyHold.js";

// changeActivePlayer() passes animal player object
// Animal decides whether to exchange, buy, or hold this turn
const thinkLikeAnimal = animal => {
  if (animal.currentScore >= 22) {
    messageArea.innerHTML = `<h5>${animal.name} holds.`;
    hold();
  }
};

const dealIfAnimal = dealer => {
  // code
  console.log(dealer);
};

export { thinkLikeAnimal as default, dealIfAnimal };
