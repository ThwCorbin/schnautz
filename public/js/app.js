// Control and Players variables
const beginEndGameButton = document.querySelector(".beginEndGameButton");
const playersButton = document.querySelector(".playersButton");
const dealButton = document.querySelector(".dealButton");
const num1to4 = document.querySelector(".num1to4");
const players = [];
let activePlayer = "leftOfDealer";
// Deck variables
let numCards = 12;
let shuffledDeck;
let dealtDeck;
// Hand variables
const exchangeButton = document.querySelector(".exchangeButton");
const buyButton = document.querySelector(".buyButton");
const holdButton = document.querySelector(".holdButton");
const leftOfDealerHand = [];
const acrossFromDealerHand = [];
const rightOfDealerHand = [];
const dealerHand = [];
const extraHand = [];
// Card variables
const aCard = document.querySelectorAll(".aCard");
const extraCard = document.querySelectorAll(".extraCard");
const playerOneCard = document.querySelectorAll(".playerOneCard");
const playerTwoCard = document.querySelectorAll(".playerTwoCard");
const playerThreeCard = document.querySelectorAll(".playerThreeCard");
const playerFourCard = document.querySelectorAll(".playerFourCard");

// Game variables and resets
let activeGame = false;
let activeRound = false;

const clearTable = () => {
  activeRound = false;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  dealerHand.length = 0;
  extraHand.length = 0;
  aCard.forEach(val => {
    val.classList.remove("is-active");
    val.textContent = "";
  });
};

const resetGame = () => {
  activeGame = false;
  players.length = 0;
  dealButton.textContent = "Players?";
  beginEndGameButton.textContent = "Start";
  clearTable();
};

// Generate players
const generatePlayers = numPlayers => {
  clearTable();
  for (let i = 1; i <= numPlayers; i++) {
    players.push({
      player: i,
      position:
        i === 1
          ? "dealer"
          : i === 2
          ? "leftOfDealer"
          : i === 3
          ? "acrossFromDealer"
          : "rightOfDealer",
      activePlayer: i === 2,
      buyLastTurn: false,
      holdLastTurn: false,
      tokens: 3,
      currentScore: null
    });
  }
  console.log(players);
};

// Change number of players and number of cards to deal
const changePlayersNum = () => {
  if (!activeGame) {
    num1to4.textContent === "4"
      ? ((num1to4.textContent = "3"), (numCards = 12))
      : num1to4.textContent === "3"
      ? ((num1to4.textContent = "2"), (numCards = 9))
      : ((num1to4.textContent = "4"), (numCards = 15));
  }
};
playersButton.addEventListener("click", changePlayersNum);

// Begin and End Play
const beginEndGame = () => {
  if (!activeGame) {
    activeGame = true;
    generatePlayers(Number(num1to4.textContent));
    playersButton.textContent = "Deal";
    beginEndGameButton.textContent = "End Game";
  } else if (activeGame && beginEndGameButton.textContent === "End Game") {
    beginEndGameButton.textContent = "Sure?";
  } else {
    resetGame();
  }
};
beginEndGameButton.addEventListener("click", beginEndGame);

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
        selected: false
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

// Assign cards to players' hands and extra hand
const assignCardsToPlayers = () => {
  // Select subset of shuffledDeck based on number of players
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
};

// Deal card objects
const deal = () => {
  if (activeGame && activeRound === false) {
    clearTable();
    activeRound = true;
    dealButton.textContent = "Advice";
    shuffle(newDeck());
    assignCardsToPlayers();
    // "Deal" cards to screen
    if (numCards === 15) {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        playerOneCard[i].textContent = dealerHand[i].card;
        playerTwoCard[i].textContent = leftOfDealerHand[i].card;
        playerThreeCard[i].textContent = acrossFromDealerHand[i].card;
        playerFourCard[i].textContent = rightOfDealerHand[i].card;
      }
    } else if (numCards === 12) {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        playerOneCard[i].textContent = dealerHand[i].card;
        playerTwoCard[i].textContent = leftOfDealerHand[i].card;
        playerThreeCard[i].textContent = acrossFromDealerHand[i].card;
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        playerOneCard[i].textContent = dealerHand[i].card;
        playerTwoCard[i].textContent = leftOfDealerHand[i].card;
      }
    }

    // Style black cards
    aCard.forEach(val =>
      val.textContent.includes("♤")
        ? val.classList.add("aCardBlack")
        : val.textContent.includes("♧")
        ? val.classList.add("aCardBlack")
        : val.classList.remove("aCardBlack")
    );
    console.log(dealtDeck);
    console.log(extraHand);
  } else if (activeRound) {
    alert(
      "Exchange either one cards or three cards from your hand with the extra hand. But you can't exchange two cards!"
    );
  }
  // Note: deal() mutates object created in newDeck
};
dealButton.addEventListener("click", deal);

// Select/deselect cards to exchange and style elements
const activeCard = e => {
  dealtDeck.forEach(val => {
    if (e.target.textContent === val.card) {
      return val.selected === false
        ? ((val.selected = true), e.target.classList.add("is-active"))
        : ((val.selected = false), e.target.classList.remove("is-active"));
    }
    return null; // eslint error: Expected to return a value at end of arrow function
  });
};
// Add event listener to aCard nodelist to trigger activeCard(e)
for (let i = 0; i < aCard.length; i++) {
  aCard[i].addEventListener("click", activeCard);
}

// Change the dealer
// const changeDealer {
// or just change a dealer variable
// }

// Change the active player
// ...or should this just be player 1 2 3 4
// ...and then use player array of objects to track current dealer etc.
const changeActivePlayer = () => {
  activePlayer === "dealer" // leftOfDealer is always after dealer
    ? (activePlayer = "leftOfDealer")
    : activePlayer === "leftOfDealer" && numCards === 9 // when two players
    ? (activePlayer = "dealer")
    : activePlayer === "leftOfDealer" // when three or four players
    ? (activePlayer = "acrossFromDealer")
    : activePlayer === "acrossFromDealer" && numCards === 12 // when three players
    ? (activePlayer = "dealer")
    : activePlayer === "acrossFromDealer" // when four players
    ? (activePlayer = "rightOfDealer")
    : (activePlayer = "dealer"); // dealer is always after rightOfDealer
};

// const buy = () => {
//   players.filter((val, idx) => {
// See changeActivePlayer above to figure out...
// };

// Exchange 1 or 3 cards with extra hand
const exchangeCards = () => {
  if (activeGame && activeRound) {
    // return null; // eslint error: Expected to return a value at end of arrow function
    // change activePlayer to next player
  }
};
exchangeButton.addEventListener("click", exchangeCards);

// Alternatives for suits
// White club suit 	♧ 	U+2667 	&#9831 -- Black club suit 	♣ 	U+2663 	&clubs
// White diamond suit 	♢ 	U+2662 	&#9826 -- Black diamond suit 	♦ 	U+2666 	&diams
// White heart suit 	♡ 	U+2661 	&#9825 -- Black heart suit 	♥ 	U+2665 	&hearts
// White spade suit 	♤ 	U+2664 	&#9828 -- Black spade suit 	♠ 	U+2660 	&spade
