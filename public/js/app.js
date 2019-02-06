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
const allHands = [
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand,
  dealerHand,
  extraHand
];
// Card variables
const aCard = document.querySelectorAll(".aCard");
const extraCard = document.querySelectorAll(".extraCard");
const playerOneCard = document.querySelectorAll(".playerOneCard");
const playerTwoCard = document.querySelectorAll(".playerTwoCard");
const playerThreeCard = document.querySelectorAll(".playerThreeCard");
const playerFourCard = document.querySelectorAll(".playerFourCard");
const cardsToExtraHand = [];
const cardsFromExtraHand = [];

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
  // allHands.push(
  //   leftOfDealerHand,
  //   acrossFromDealerHand,
  //   rightOfDealerHand,
  //   dealerHand,
  //   extraHand
  // );
  aCard.forEach(val => {
    val.classList.remove("is-active");
    val.textContent = "";
  });
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;
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
  // console.log(players);
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

// Generate new deck (an array of card objects) to pass to shuffle function
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

// Generate shuffled deck from newDeck()'s array of card objects to pass to deal function
// Fisher–Yates Shuffle
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

// ///////////////////////////////////////////////////////////////////////
// !!! Lets mutate some objects !!!
// ///////////////////////////////////////////////////////////////////////

// Assign cards to players' hands and extra hand
const assignCardsToPlayers = () => {
  // Note: mutates the objects that newDeck() created inside an array
  // Select subset of shuffledDeck based on number of players
  dealtDeck = shuffledDeck.filter((cardObj, idx) => idx < numCards);
  // Assign card objects to players and extra hand
  switch (numCards) {
    case 15:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 5 || idx === 10) {
          cardObj.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 6 || idx === 11) {
          cardObj.cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 7 || idx === 12) {
          cardObj.cardPosition = "rightOfDealerHand";
          rightOfDealerHand.push(cardObj);
        } else if (idx === 3 || idx === 8 || idx === 13) {
          cardObj.cardPosition = "dealerHand";
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          extraHand.push(cardObj);
        }
      });
      break;
    case 12:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 4 || idx === 8) {
          cardObj.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 5 || idx === 9) {
          cardObj.cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 6 || idx === 10) {
          cardObj.cardPosition = "dealerHand";
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          extraHand.push(cardObj);
        }
      });
      break;
    default:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 3 || idx === 6) {
          cardObj.cardPosition = "leftOfDealerHand";
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 4 || idx === 7) {
          cardObj.cardPosition = "dealerHand";
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          extraHand.push(cardObj);
        }
      });
      break;
  }
};

// Style black cards
const styleBlackCards = () => {
  aCard.forEach(val =>
    val.textContent.includes("♤")
      ? val.classList.add("aCardBlack")
      : val.textContent.includes("♧")
      ? val.classList.add("aCardBlack")
      : val.classList.remove("aCardBlack")
  );
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
    // Style card colors
    styleBlackCards();
    // console.log(dealtDeck);
    console.log(extraHand);
  } else if (activeRound) {
    alert("Select cards to exchange.");
  }
};
dealButton.addEventListener("click", deal);

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

// Manage cards that current player will be exchange with extra hand
const manageCardsToExchange = (fromExtra, isSelected, cardObj) => {
  fromExtra && isSelected
    ? cardsFromExtraHand.push(cardObj)
    : fromExtra && !isSelected
    ? cardsFromExtraHand.splice(cardsFromExtraHand.indexOf(cardObj), 1)
    : !fromExtra && isSelected
    ? cardsToExtraHand.push(cardObj)
    : cardsToExtraHand.splice(cardsToExtraHand.indexOf(cardObj), 1);
};

// Select and deselect cards in active player's and extra hands
const selectDeselectCard = e => {
  // Note: mutates the objects that newDeck() created inside an array
  dealtDeck.forEach(cardObj => {
    // Toggles boolean "selected" property in card objects
    // Toggles event target's classList "is-active" for styling
    // Calls manageCardsToExchange with params (fromExtra, isSelected, cardObj)
    if (
      e.target.className.includes("extraCard") &&
      e.target.textContent === cardObj.card
    ) {
      cardObj.selected === false
        ? ((cardObj.selected = true),
          e.target.classList.add("is-active"),
          manageCardsToExchange(true, true, cardObj))
        : ((cardObj.selected = false),
          e.target.classList.remove("is-active"),
          manageCardsToExchange(true, false, cardObj));
    } else if (e.target.textContent === cardObj.card) {
      cardObj.selected === false
        ? ((cardObj.selected = true),
          e.target.classList.add("is-active"),
          manageCardsToExchange(false, true, cardObj))
        : ((cardObj.selected = false),
          e.target.classList.remove("is-active"),
          manageCardsToExchange(false, false, cardObj));
    }
  });
  // console.log(cardsToExtraHand);
  // console.log(cardsFromExtraHand);
};

// Add event listeners to playerOneCard, etc., & extraCard nodelists
// Note to fix: !activePlayer can "click" extraCard...
extraCard.forEach(val => val.addEventListener("click", selectDeselectCard));
activePlayer === "dealer"
  ? playerOneCard.forEach(val =>
      val.addEventListener("click", selectDeselectCard)
    )
  : activePlayer === "leftOfDealer"
  ? playerTwoCard.forEach(val =>
      val.addEventListener("click", selectDeselectCard)
    )
  : activePlayer === "acrossFromDealer"
  ? playerThreeCard.forEach(val =>
      val.addEventListener("click", selectDeselectCard)
    )
  : playerFourCard.forEach(val =>
      val.addEventListener("click", selectDeselectCard)
    );

// Change the dealer
const changeDealer = () => {
  // or just change a dealer variable
};

const buy = () => {
  // if player did not buy or hold on last turn...
  // ...change players array buy property to true for current player
  // changeActivePlayer();
  // need to change buy property back to false after player's next turn?
};

// Exchange 1 or 3 cards from a player's hand with the extra hand
const exchangeCards = () => {
  // Note: mutates the objects that newDeck() created inside an array
  if (activeGame && activeRound) {
    if (cardsToExtraHand.length === 1 && cardsFromExtraHand.length === 1) {
      // swapping one card
      dealtDeck.forEach(cardToExtra => {
        cardsToExtraHand.forEach(obj => {
          if (obj.card === cardToExtra.card) {
            cardToExtra.cardPosition = "extraHand";
            extraHand.push(cardToExtra);
          }
        });
        console.log(cardsToExtraHand);
      });
      dealtDeck.forEach(cardFromExtra => {
        cardsFromExtraHand.forEach(obj => {
          if (obj.card === cardFromExtra.card) {
            cardFromExtra.cardPosition = activePlayer;
            extraHand.splice(extraHand.indexOf(cardFromExtra, 1));
          }
        });
        console.log(cardsFromExtraHand);
      });
    } else if (
      cardsToExtraHand.length === 3 &&
      cardsFromExtraHand.length === 3
    ) {
      // swapping three cards
      extraHand.splice(0, 3, ...cardsToExtraHand);
      leftOfDealerHand.splice(0, 3, ...cardsFromExtraHand);
      cardsToExtraHand.length = 0;
      cardsFromExtraHand.length = 0;
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        // playerOneCard[i].textContent = dealerHand[i].card;
        playerTwoCard[i].textContent = leftOfDealerHand[i].card;
        // playerThreeCard[i].textContent = acrossFromDealerHand[i].card;
        // playerFourCard[i].textContent = rightOfDealerHand[i].card;
      }
    } else {
      alert("Select either one or three cards to exchange.");
    }
    styleBlackCards();
    console.log(extraHand);
  } else {
    alert("Game or round is not active.");
  }
};

exchangeButton.addEventListener("click", exchangeCards);

// Alternatives for suits
// White club suit 	♧ 	U+2667 	&#9831 -- Black club suit 	♣ 	U+2663 	&clubs
// White diamond suit 	♢ 	U+2662 	&#9826 -- Black diamond suit 	♦ 	U+2666 	&diams
// White heart suit 	♡ 	U+2661 	&#9825 -- Black heart suit 	♥ 	U+2665 	&hearts
// White spade suit 	♤ 	U+2664 	&#9828 -- Black spade suit 	♠ 	U+2660 	&spade
//
// Alternatives for: Add event listener to aCard nodelist to trigger selectDeselectCard(e)
// for (let i = 0; i < aCard.length; i++) {
//   aCard[i].addEventListener("click", selectDeselectCard);
// }
//
// if(activePlayer === "leftOfDealer") {
//   for(let cardCurrent of leftOfDealerHand) {
//     for(let cardNew of cardsFromExtraHand )
//   }
// }
// for (let hand of allHands) {
//   console.log(hand);
// }
// console.log(activePlayer);
// leftOfDealerHand
// acrossFromDealerHand
// rightOfDealerHand
// dealerHand
// extraHand
// for(let cardObj of dealtDeck){
//   cardObj.position === activePlayer

// based on activePlayer string value...
// use values from cardsToExtraHand and cardsFromExtraHand arrays...
// to update cardPosition property in card objects in dealtDeck array...
// and to update DOM with changes to aCard textContent...
// render changes
// changeActivePlayer();
