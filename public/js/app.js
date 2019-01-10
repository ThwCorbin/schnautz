// Table and Player variables
const aCard = document.querySelectorAll(".aCard");
const extraCard = document.querySelectorAll(".extraCard");
const playerOneCard = document.querySelectorAll(".playerOneCard");
const playerTwoCard = document.querySelectorAll(".playerTwoCard");
const playerThreeCard = document.querySelectorAll(".playerThreeCard");
const playerFourCard = document.querySelectorAll(".playerFourCard");
// const card1A = document.querySelector(".card__p1A");
// const card1B = document.querySelector(".card__p1B");
// const card1C = document.querySelector(".card__p1C");
// const card2A = document.querySelector(".card__p2A");
// const card2B = document.querySelector(".card__p2B");
// const card2C = document.querySelector(".card__p2C");
// const card3A = document.querySelector(".card__p3A");
// const card3B = document.querySelector(".card__p3B");
// const card3C = document.querySelector(".card__p3C");
// const card4A = document.querySelector(".card__p4A");
// const card4B = document.querySelector(".card__p4B");
// const card4C = document.querySelector(".card__p4C");
// const card5A = document.querySelector(".card__p5A");
// const card5B = document.querySelector(".card__p5B");
// const card5C = document.querySelector(".card__p5C");
const num1to4 = document.querySelector(".num1to4");
const playersButton = document.querySelector(".playersButton");
const dealButton = document.querySelector(".dealButton");
const exchangeButton = document.querySelector(".exchangeButton");
const buyButton = document.querySelector(".buyButton");
const holdButton = document.querySelector(".holdButton");
let shuffledDeck;
let dealtDeck;
let roundActive = false;

const leftOfDealerHand = [];
const acrossFromDealerHand = [];
const rightOfDealerHand = [];
const dealerHand = [];
const extraHand = [];
// let currentHandp2 = [];
// let currentHandp3 = [];
// let currentHandp4 = [];

const player1Status = {
  currentPlayer: null
};
const player2Status = {
  currentPlayer: null
};
const player3Status = {
  currentPlayer: null
};
const player4Status = {
  currentPlayer: null
};

const clear = () => {
  roundActive = false;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  dealerHand.length = 0;
  extraHand.length = 0;
  // currentHandp2.length = 0;
  // currentHandp3.length = 0;
  // currentHandp4.length = 0;
  // commonHand.length = 0;
  player1Status.currentPlayer = null;
  player2Status.currentPlayer = null;
  player3Status.currentPlayer = null;
  player4Status.currentPlayer = null;
};

// Change number of players
const changeNum = () => {
  clear();
  return num1to4.textContent === "4"
    ? (num1to4.textContent = "3")
    : num1to4.textContent === "3"
    ? (num1to4.textContent = "2")
    : (num1to4.textContent = "4");
};

playersButton.addEventListener("click", changeNum);

// Generate new deck to pass to shuffle function
const newDeck = () => {
  const suits = ["♧", "♢", "♡", "♤"];
  const ranks = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  const deck = [];
  // Build fresh deck as an array of objects.
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push({
        card: ranks[i] + suits[j],
        rank: ranks[i],
        suit: suits[j],
        cardPosition: "",
        selected: false,
        buyLastTurn: false
      });
    }
  }
  return deck;
};

// White club suit 	♧ 	U+2667 	&#9831;
// White diamond suit 	♢ 	U+2662 	&#9826;
// White heart suit 	♡ 	U+2661 	&#9825;
// White spade suit 	♤ 	U+2664 	&#9828;
// Black club suit 	♣ 	U+2663 	&clubs;
// Black diamond suit 	♦ 	U+2666 	&diams;
// Black heart suit 	♥ 	U+2665 	&hearts;
// Black spade suit 	♠ 	U+2660 	&spades;

// Generate shuffled deck from new deck to pass to deal function
// Fisher–Yates Shuffle
const shuffle = deck => {
  let numUnshuffledCards = deck.length;
  let lastUnshuffledCard;
  let randomUnshuffledCard;
  // While unshuffled cards remain...
  // Select and move a random unshuffled card to the shuffled portion of the array.
  // Move the card the random card replaced to the unshuffled portion of the array.
  while (numUnshuffledCards) {
    // Pick a random card from the unshuffled portion of the deck,
    // and decrement the number of unshuffled cards by 1.
    randomUnshuffledCard = Math.floor(Math.random() * numUnshuffledCards--);
    // Assign the last card in the unshuffled portion of the array to a variable.
    lastUnshuffledCard = deck[numUnshuffledCards];
    // Move the random card to the last unshuffled card's position.
    deck[numUnshuffledCards] = deck[randomUnshuffledCard];
    // Move the last unshuffled card to the random card's previous position.
    deck[randomUnshuffledCard] = lastUnshuffledCard;
  }
  shuffledDeck = deck;
  return shuffledDeck;
};

// Deal cards and record each player's hand
const deal = () => {
  clear();
  let players = num1to4.textContent; // 4, 3, or 2 players
  let numCards;
  shuffle(newDeck());

  // Select subset of shuffledDeck based on number of players
  players === "4"
    ? (numCards = 15)
    : players === "3"
    ? (numCards = 12)
    : (numCards = 9);
  dealtDeck = shuffledDeck.filter((val, idx) => idx < numCards);
  // let dealThisManyCards = Number(players) + 1;

  // Assign card objects to players and extra hand
  switch (numCards) {
    case 15:
      dealtDeck.forEach((val, idx) => {
        if (idx === 0 || idx === 5 || idx === 10) {
          val.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(val);
        } else if (idx === 1 || idx === 6 || idx === 11) {
          val.cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand.push(val);
        } else if (idx === 2 || idx === 7 || idx === 12) {
          val.cardPosition = "rightOfDealerHand";
          rightOfDealerHand.push(val);
        } else if (idx === 3 || idx === 8 || idx === 13) {
          val.cardPosition = "dealerHand";
          dealerHand.push(val);
        } else {
          val.cardPosition = "extraHand";
          extraHand.push(val);
        }
      });
      break;
    case 12:
      dealtDeck.forEach((val, idx) => {
        if (idx === 0 || idx === 4 || idx === 8) {
          val.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(val);
        } else if (idx === 1 || idx === 5 || idx === 9) {
          val.cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand.push(val);
        } else if (idx === 2 || idx === 6 || idx === 10) {
          val.cardPosition = "dealerHand";
          dealerHand.push(val);
        } else {
          val.cardPosition = "extraHand";
          extraHand.push(val);
        }
      });
      break;
    default:
      dealtDeck.forEach((val, idx) => {
        if (idx === 0 || idx === 3 || idx === 6) {
          val.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(val);
        } else if (idx === 1 || idx === 4 || idx === 7) {
          val.cardPosition = "dealerHand";
        } else {
          val.cardPosition = "extraHand";
        }
      });
      break;
  }

  // "Deal" cards to screen
  extraCard[0].textContent = extraHand[0].card;
  extraCard[1].textContent = extraHand[1].card;
  extraCard[2].textContent = extraHand[2].card;
  playerOneCard[0].textContent = dealerHand[0].card;
  playerOneCard[1].textContent = dealerHand[1].card;
  playerOneCard[2].textContent = dealerHand[2].card;

  // Style black cards
  aCard.forEach(val =>
    val.textContent.includes("♤")
      ? val.setAttribute("id", "aCardBlack")
      : val.textContent.includes("♧")
      ? val.setAttribute("id", "aCardBlack")
      : val.removeAttribute("id", "aCardBlack")
  );
  console.log(dealtDeck);
  console.log(extraHand);
  return dealtDeck;
  // Note: deal() mutates object created in newDeck
};

// Set initial card positions for players and common hand.
// dealtDeck.map((val, idx) => {
//   idx < dealThisManyCards
//     ? (val.cardPosition = idx + 1)
//     : idx >= dealThisManyCards && idx < dealThisManyCards * 2
//     ? (val.cardPosition = idx - dealThisManyCards + 1)
//     : idx >= dealThisManyCards * 2
//     ? (val.cardPosition = idx - dealThisManyCards * 2 + 1)
//     : console.log("Error: Setting the card positions did not work!");
// });

// Sets cardPosition initial value in card objects
//    by num of players:  4p  3p  2players
// left of dealer =       1   1   1
// the next player =      2   2   x
// right of dealer =      3   x   x
// dealer =               4   3   2
// common hand =          5   4   3
// numCards =            15  12   9

// Add cards to players' hand and common hand arrays
// dealtDeck.forEach(val => {
//   val.cardPosition === 5
//     ? commonHand.push(val)
//     : val.cardPosition === 4 && numCards === 12
//     ? commonHand.push(val)
//     : val.cardPosition === 4
//     ? dealerHand.push(val)
//     : val.cardPosition === 1
//     ? leftOfDealerHand.push(val)
//     : val.cardPosition === 2
//     ? currentHandp2.push(val)
//     : val.cardPosition === 3 && numCards === 9
//     ? commonHand.push(val)
//     : val.cardPosition === 3
//     ? currentHandp3.push(val)
//     : commonHand.push(val);

// val.cardPosition === 1
//   ? leftOfDealerHand.push(val)
//   : val.cardPosition === 2
//   ? currentHandp2.push(val)
//   : val.cardPosition === 3 && numCards === 9
//   ? commonHand.push(val)
//   : val.cardPosition === 3
//   ? currentHandp3.push(val)
//   : val.cardPosition === 4 && numCards === 12
//   ? commonHand.push(val)
//   : val.cardPosition === 4
//   ? currentHandp4.push(val)
//   : commonHand.push(val);
// refactored line above to remove three lines below
// : val.cardPosition === 5
// ? commonHand.push(val) //
// : console.log("Nothing to push, love!");
// });

// Applies card positions to card table
// Not a concise solution...can I can refactor below?
// if (numCards === 15) {
//   card1A.textContent = dealtDeck[0].card;
//   card2A.textContent = dealtDeck[1].card;
//   card3A.textContent = dealtDeck[2].card;
//   card4A.textContent = dealtDeck[3].card;
//   card5A.textContent = dealtDeck[4].card;
//   card1B.textContent = dealtDeck[5].card;
//   card2B.textContent = dealtDeck[6].card;
//   card3B.textContent = dealtDeck[7].card;
//   card4B.textContent = dealtDeck[8].card;
//   card5B.textContent = dealtDeck[9].card;
//   card1C.textContent = dealtDeck[10].card;
//   card2C.textContent = dealtDeck[11].card;
//   card3C.textContent = dealtDeck[12].card;
//   card4C.textContent = dealtDeck[13].card;
//   card5C.textContent = dealtDeck[14].card;
// } else if (numCards === 12) {
//   card1A.textContent = dealtDeck[0].card;
//   card2A.textContent = dealtDeck[1].card;
//   card3A.textContent = dealtDeck[2].card;
//   card5A.textContent = dealtDeck[3].card;
//   card1B.textContent = dealtDeck[4].card;
//   card2B.textContent = dealtDeck[5].card;
//   card3B.textContent = dealtDeck[6].card;
//   card5B.textContent = dealtDeck[7].card;
//   card1C.textContent = dealtDeck[8].card;
//   card2C.textContent = dealtDeck[9].card;
//   card3C.textContent = dealtDeck[10].card;
//   card5C.textContent = dealtDeck[11].card;
//   card4A.textContent = "";
//   card4B.textContent = "";
//   card4C.textContent = "";
// } else {
//   card1A.textContent = dealtDeck[0].card;
//   card2A.textContent = dealtDeck[1].card;
//   card5A.textContent = dealtDeck[2].card;
//   card1B.textContent = dealtDeck[3].card;
//   card2B.textContent = dealtDeck[4].card;
//   card5B.textContent = dealtDeck[5].card;
//   card1C.textContent = dealtDeck[6].card;
//   card2C.textContent = dealtDeck[7].card;
//   card5C.textContent = dealtDeck[8].card;
//   card3A.textContent = "";
//   card3B.textContent = "";
//   card3C.textContent = "";
//   card4A.textContent = "";
//   card4B.textContent = "";
//   card4C.textContent = "";
// }
//   aCard.forEach(val =>
//     val.textContent.includes("♤")
//       ? val.setAttribute("id", "aCardBlack")
//       : val.textContent.includes("♧")
//       ? val.setAttribute("id", "aCardBlack")
//       : val.removeAttribute("id", "aCardBlack")
//   );

//   // val => val.textContent.includes("♧" || "♤") ? val.setAttribute("class", "aCardBlack") : val.removeAttribute("class", "aCardBlack"));
//   player1Status.currentPlayer = true;
//   console.log(dealtDeck);
//   console.log(commonHand);
//   return dealtDeck;
//   // Note: deal() mutates object created in newDeck
// };

dealButton.addEventListener("click", deal);

// Select current player
const changeCurrentPlayer = () => {
  // Player One is initial current player after each deal
  if (player1Status.currentPlayer === true) {
    player2Status.currentPlayer = true;
    player1Status.currentPlayer = false;
  } else if (player2Status.currentPlayer === true && dealtDeck.length > 9) {
    player1Status.currentPlayer = true;
    player2Status.currentPlayer = false;
  } else if (player2Status.currentPlayer === true && dealtDeck.length > 9) {
    player3Status.currentPlayer = true;
    player2Status.currentPlayer = false;
  } else if (player3Status.currentPlayer === true && dealtDeck.length > 12) {
    player4Status.currentPlayer = true;
    player3Status.currentPlayer = false;
  } else {
    player1Status.currentPlayer = true;
    player4Status.currentPlayer = false;
  }
};

// Current player can "buy" to skip turn without
// exchanging any cards but must either exchange
// cards or "hold" on player's next turn
const buy = e => {};

buyButton.addEventListener("click", buy);

// e.target.textContent
// dealtDeck.filter((val) => {
//   if (val.card.active === false) {
// e.target.classList.add("is-active") :
//     val.
//   } else {
//     e.target.classList.remove("is-active");
// val.selected = true;

// Select and deselect active card
const activeCard = e => {
  dealtDeck.filter(val => {
    if (e.target.textContent === val.card) {
      val.selected === false ? (val.selected = true) : (val.selected = false);
      val.selected === true
        ? e.target.classList.add("is-active")
        : e.target.classList.remove("is-active");
    }
  });
};

for (let i = 0; i < aCard.length; i++) {
  aCard[i].addEventListener("click", activeCard);
}

// const exchangeCards = () => {
//   if()
// };

// exchangeButton.addEventListener("click", exchangeCards);
