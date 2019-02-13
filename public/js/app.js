// Control and Players variables
const beginEndGameButton = document.querySelector(".beginEndGameButton");
const playersButton = document.querySelector(".playersButton");
const dealButton = document.querySelector(".dealButton");
const num1to4 = document.querySelector(".num1to4");
const players = [];
let activeNum = 1;
let numCards = 12;
let eventsCards;
let shuffledDeck;
let dealtDeck;
// Hand variables
const exchangeButton = document.querySelector(".exchangeButton");
const buyButton = document.querySelector(".buyButton");
const holdButton = document.querySelector(".holdButton");
const playerTwoArea = document.querySelector(".playerTwoArea");
const playerThreeArea = document.querySelector(".playerThreeArea");
const playerFourArea = document.querySelector(".playerFourArea");
const playerOneArea = document.querySelector(".playerOneArea");
// const extraArea = document.querySelector(".extraArea");
const extraHand = [];
const dealerHand = [];
const leftOfDealerHand = [];
const acrossFromDealerHand = [];
const rightOfDealerHand = [];
const allHands = [
  extraHand,
  dealerHand,
  leftOfDealerHand,
  acrossFromDealerHand,
  rightOfDealerHand
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
let activeCards = playerTwoCard;

// Game variables and resets
let activeGame = false;
let activeRound = false;

const clearTable = () => {
  activeRound = false;
  activeNum = 1;
  // activeCards = playerTwoCard;
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  dealerHand.length = 0;
  extraHand.length = 0;
  allHands.push(
    extraHand,
    dealerHand,
    leftOfDealerHand,
    acrossFromDealerHand,
    rightOfDealerHand
  );
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
      activePlayer: i === 1, // boolean - default is dealer
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

// Change the active player
const changeActivePlayer = () => {
  activeNum === 1
    ? // leftOfDealer is always after dealer
      ((activeNum = 2),
      (players[0].activePlayer = false),
      (players[1].activePlayer = true),
      playerOneArea.classList.remove("active-area"),
      playerTwoArea.classList.add("active-area"),
      (activeCards = playerTwoCard))
    : activeNum === 2 && numCards === 9
    ? // when there are two players, dealer is after leftOfDealer
      ((activeNum = 1),
      (players[1].activePlayer = false),
      (players[0].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard))
    : activeNum === 2
    ? // when there are three or four players, accrossFromDealer is next
      ((activeNum = 3),
      (players[1].activePlayer = false),
      (players[2].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerThreeArea.classList.add("active-area"),
      (activeCards = playerThreeCard))
    : activeNum === 3 && numCards === 12
    ? // when there three players, dealer is next
      ((activeNum = 1),
      (players[2].activePlayer = false),
      (players[0].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard))
    : activeNum === 3
    ? // when there are four players, rightOfDealer is next
      ((activeNum = 4),
      (players[2].activePlayer = false),
      (players[3].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerFourArea.classList.add("active-area"),
      (activeCards = playerFourCard))
    : // dealer is always after rightOfDealer
      ((activeNum = 1),
      (players[3].activePlayer = false),
      (players[0].activePlayer = true),
      playerFourArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard));
  eventsCards();
  // Clear arrays for next player
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;
};

// Deal card objects
const deal = () => {
  if (activeGame && activeRound === false) {
    clearTable();
    activeRound = true;
    dealButton.textContent = "Score";
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
    playerTwoArea.classList.add("active-area");
    styleBlackCards();
    changeActivePlayer();
    // console.log(dealtDeck);
    console.log(extraHand);
  } else if (activeRound && dealButton.textContent === "Score") {
    // Temp code to call and test checkScore()
    // checkScore();
  }
};
dealButton.addEventListener("click", deal);

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

// Add event listeners to playerOneCard, etc., & extraCard NodeLists
extraCard.forEach(val => val.addEventListener("click", selectDeselectCard));
eventsCards = () =>
  activeCards.forEach(val => val.addEventListener("click", selectDeselectCard));

// Check score
// const updateScore = (aValue, bValue) => {
//   // (if leftOfDealerHand[0].suit === leftOfDealerHand[0].suit)
//   // leftOfDealerHand.reduce((acc, next) => leftOfDealerHand.);
//   if (activeNum === 2) {
//     (if leftOfDealerHand[0].suit === leftOfDealerHand[0].suit) {
//       return;
//     }
// };

const checkScore = () => {
  players.forEach(player => {
    if (player.activePlayer) {
      console.log(player.currentScore);
    }
  });
};

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
    // Note: All arrays below reference the same deck card objects
    if (cardsToExtraHand.length === 1 && cardsFromExtraHand.length === 1) {
      let swapToCardPosition = cardsToExtraHand[0].cardPosition;
      let idxFromExtraHand = extraHand.indexOf(cardsFromExtraHand[0]);
      let idxFromExtraNode;
      let idxToExtraHand;
      let idxToPlayNode;

      // Switch .cardPosition property values e.g. "leftOfDealerHand" for "extraHand"
      cardsFromExtraHand[0].cardPosition = swapToCardPosition;
      cardsToExtraHand[0].cardPosition = "extraHand";
      cardsFromExtraHand[0].selected = false;
      cardsToExtraHand[0].selected = false;
      // Remove and replace one card object from extraHand
      extraHand.splice(idxFromExtraHand, 1, cardsToExtraHand[0]);
      // Retrieve index from NodeList and modify textContent && classlist
      extraCard.forEach((val, idx) => {
        if (val.textContent === cardsFromExtraHand[0].card) {
          idxFromExtraNode = idx;
        }
      });
      extraCard[idxFromExtraNode].textContent = cardsToExtraHand[0].card;
      extraCard[idxFromExtraNode].classList.remove("is-active");

      if (swapToCardPosition === "leftOfDealerHand") {
        idxToExtraHand = leftOfDealerHand.indexOf(cardsToExtraHand[0]);
        // Remove and replace one card object from leftOfDealerHand
        leftOfDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
        // Retrieve index from NodeList and modify textContent && classlist
        playerTwoCard.forEach((val, idx) => {
          if (val.textContent === cardsToExtraHand[0].card) {
            idxToPlayNode = idx;
          }
        });
        playerTwoCard[idxToPlayNode].textContent = cardsFromExtraHand[0].card;
        playerTwoCard[idxToPlayNode].classList.remove("is-active");
      } else if (swapToCardPosition === "acrossFromDealerHand") {
        idxToExtraHand = acrossFromDealerHand.indexOf(cardsToExtraHand[0]);
        // Remove and replace one card object from acrossFromDealerHand
        acrossFromDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
        // Retrieve index from NodeList and modify textContent && classlist
        playerThreeCard.forEach((val, idx) => {
          if (val.textContent === cardsToExtraHand[0].card) {
            idxToPlayNode = idx;
          }
        });
        playerThreeCard[idxToPlayNode].textContent = cardsFromExtraHand[0].card;
        playerThreeCard[idxToPlayNode].classList.remove("is-active");
      } else if (swapToCardPosition === "rightOfDealerHand") {
        idxToExtraHand = rightOfDealerHand.indexOf(cardsToExtraHand[0]);
        // Remove and replace one card object from acrossFromDealerHand
        rightOfDealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
        // Retrieve index from NodeList and modify textContent && classlist
        playerFourCard.forEach((val, idx) => {
          if (val.textContent === cardsToExtraHand[0].card) {
            idxToPlayNode = idx;
          }
        });
        playerFourCard[idxToPlayNode].textContent = cardsFromExtraHand[0].card;
        playerFourCard[idxToPlayNode].classList.remove("is-active");
      } else if (swapToCardPosition === "dealerHand") {
        idxToExtraHand = dealerHand.indexOf(cardsToExtraHand[0]);
        // Remove and replace one card object from acrossFromDealerHand
        dealerHand.splice(idxToExtraHand, 1, cardsFromExtraHand[0]);
        // Retrieve index from NodeList and modify textContent && classlist
        playerOneCard.forEach((val, idx) => {
          if (val.textContent === cardsToExtraHand[0].card) {
            idxToPlayNode = idx;
          }
        });
        playerOneCard[idxToPlayNode].textContent = cardsFromExtraHand[0].card;
        playerOneCard[idxToPlayNode].classList.remove("is-active");
      }
      styleBlackCards();
      changeActivePlayer();
    } else if (
      cardsToExtraHand.length === 3 &&
      cardsFromExtraHand.length === 3
    ) {
      // swapping three cards for extraHand
      extraHand.splice(0, 3, ...cardsToExtraHand);
      for (let i = 0; i <= 2; i++) {
        extraCard[i].textContent = extraHand[i].card;
        extraCard[i].classList.remove("is-active");
        extraHand[i].cardPosition = "extraHand";
        extraHand[i].selected = false;
      }
      // swapping three cards for the current player
      if (activeNum === 2) {
        leftOfDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerTwoCard[i].textContent = leftOfDealerHand[i].card;
          playerTwoCard[i].classList.remove("is-active");
          leftOfDealerHand[i].cardPosition = "leftOfDealerHand";
          leftOfDealerHand[i].selected = false;
        }
      } else if (activeNum === 3) {
        acrossFromDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerThreeCard[i].textContent = acrossFromDealerHand[i].card;
          playerThreeCard[i].classList.remove("is-active");
          acrossFromDealerHand[i].cardPosition = "acrossFromDealerHand";
          acrossFromDealerHand[i].selected = false;
        }
      } else if (activeNum === 4) {
        rightOfDealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerFourCard[i].classList.remove("is-active");
          playerFourCard[i].textContent = rightOfDealerHand[i].card;
          rightOfDealerHand[i].cardPosition = "rightOfDealerHand";
          rightOfDealerHand[i].selected = false;
        }
      } else if (activeNum === 1) {
        dealerHand.splice(0, 3, ...cardsFromExtraHand);
        for (let i = 0; i <= 2; i++) {
          playerOneCard[i].classList.remove("is-active");
          playerOneCard[i].textContent = dealerHand[i].card;
          dealerHand[i].cardPosition = "dealerHand";
          dealerHand[i].selected = false;
        }
      } else {
        console.log("Error");
      }
      // Fix: even if error above, below will still set cardsFromExtraHand.length = 0;
      styleBlackCards();
      changeActivePlayer();
    } else {
      alert("Error");
    }
  }
  console.log(extraHand);
};

exchangeButton.addEventListener("click", exchangeCards);

// Alternatives for suits
// White club suit 	♧ 	U+2667 	&#9831 -- Black club suit 	♣ 	U+2663 	&clubs
// White diamond suit 	♢ 	U+2662 	&#9826 -- Black diamond suit 	♦ 	U+2666 	&diams
// White heart suit 	♡ 	U+2661 	&#9825 -- Black heart suit 	♥ 	U+2665 	&hearts
// White spade suit 	♤ 	U+2664 	&#9828 -- Black spade suit 	♠ 	U+2660 	&spade
//
// Alternatives for: Add event listener to aCard NodeList to trigger selectDeselectCard(e)
// for (let i = 0; i < aCard.length; i++) {
//   aCard[i].addEventListener("click", selectDeselectCard);
// }

// playerOneCard.forEach(val => val.addEventListener("click", selectDeselectCard));
// playerTwoCard.forEach(val => val.addEventListener("click", selectDeselectCard));
// playerThreeCard.forEach(v => v.addEventListener("click", selectDeselectCard));
// playerFourCard.forEach(v => v.addEventListener("click", selectDeselectCard));

// activeNum === 1
//   ? activeCards = playerOneCard
//   : activeNum === 2
//   ? activeCards = playerTwoCard
//   : activeNum === 3
//   ? activeCards = playerThreeCard
//   : activeCards = playerFourCard
