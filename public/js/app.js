// Control and deck variables
const playersButton = document.querySelector(".playersButton");
const num1to4 = document.querySelector(".num1to4");
const dealButton = document.querySelector(".dealButton");
const exchangeButton = document.querySelector(".exchangeButton");
const buyButton = document.querySelector(".buyButton");
const holdButton = document.querySelector(".holdButton");
let shuffledDeck;
let dealtDeck;
// Hand variables
const leftOfDealerHand = [];
const acrossFromDealerHand = [];
const rightOfDealerHand = [];
const dealerHand = [];
const extraHand = [];
// Card variables
const aCard = document.querySelectorAll(".aCard");
const extraCard = document.querySelectorAll(".extraCard");
const playerOneCard = document.querySelectorAll(".playerOneCard");

// Reset
const clear = () => {
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  dealerHand.length = 0;
  extraHand.length = 0;
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

// Generate shuffled deck from new deck to pass to deal function -- Fisher–Yates Shuffle
const shuffle = deck => {
  let numUnshuffledCards = deck.length;
  // 32 card deck 7 through ace
  let randomUnshuffledCard;
  let lastUnshuffledCard;
  // Select and move a random unshuffled card to the shuffled portion of the array
  // Move the card the random card replaced to the unshuffled portion of the array
  while (numUnshuffledCards) {
    // While unshuffled cards remain,
    randomUnshuffledCard = Math.floor(Math.random() * numUnshuffledCards--);
    // Pick a random card from the unshuffled portion of the deck,
    // and decrement the number of unshuffled cards by 1 so we can...
    lastUnshuffledCard = deck[numUnshuffledCards];
    // Assign the last card in the unshuffled portion of the array to a variable
    deck[numUnshuffledCards] = deck[randomUnshuffledCard];
    // Move the random card to the last unshuffled card's position
    deck[randomUnshuffledCard] = lastUnshuffledCard;
    // Move the last unshuffled card to the random card's previous position
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
          dealerHand.push(val);
        } else {
          val.cardPosition = "extraHand";
          extraHand.push(val);
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
dealButton.addEventListener("click", deal);

// Select current player
// const changeCurrentPlayer = () => {
//   // Player One is initial current player after each deal
//   if (player1Status.currentPlayer === true) {
//     player2Status.currentPlayer = true;
//     player1Status.currentPlayer = false;
//   } else if (player2Status.currentPlayer === true && dealtDeck.length > 9) {
//     player1Status.currentPlayer = true;
//     player2Status.currentPlayer = false;
//   } else if (player2Status.currentPlayer === true && dealtDeck.length > 9) {
//     player3Status.currentPlayer = true;
//     player2Status.currentPlayer = false;
//   } else if (player3Status.currentPlayer === true && dealtDeck.length > 12) {
//     player4Status.currentPlayer = true;
//     player3Status.currentPlayer = false;
//   } else {
//     player1Status.currentPlayer = true;
//     player4Status.currentPlayer = false;
//   }
// };

// Current player can "buy" to skip turn without
// exchanging any cards but must either exchange
// cards or "hold" on player's next turn
const buy = e => {};
buyButton.addEventListener("click", buy);

// Select/deselect cards to exchange and style elements
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
// Add event listener to aCard nodelist to trigger activeCard(e)
for (let i = 0; i < aCard.length; i++) {
  aCard[i].addEventListener("click", activeCard);
}

// const exchangeCards = () => {
//   if()
// };
// exchangeButton.addEventListener("click", exchangeCards);

// Alternatives for suits
// White club suit 	♧ 	U+2667 	&#9831 -- Black club suit 	♣ 	U+2663 	&clubs
// White diamond suit 	♢ 	U+2662 	&#9826 -- Black diamond suit 	♦ 	U+2666 	&diams
// White heart suit 	♡ 	U+2661 	&#9825 -- Black heart suit 	♥ 	U+2665 	&hearts
// White spade suit 	♤ 	U+2664 	&#9828 -- Black spade suit 	♠ 	U+2660 	&spade
