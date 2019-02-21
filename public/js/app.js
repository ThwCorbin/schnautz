// ///// VARIABLES /////////////////////////////////////////////
// Control and Players variables
const beginEndGameButton = document.querySelector(".beginEndGameButton");
const playersButton = document.querySelector(".playersButton");
const dealButton = document.querySelector(".dealButton");
const num1to4 = document.querySelector(".num1to4");
const players = [];
let activePlayerNum = 1;
let numPlayers;
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
const allHands = [];
// Card variables
const aCard = document.querySelectorAll(".aCard");
const extraCard = document.querySelectorAll(".extraCard");
const playerOneCard = document.querySelectorAll(".playerOneCard");
const playerTwoCard = document.querySelectorAll(".playerTwoCard");
const playerThreeCard = document.querySelectorAll(".playerThreeCard");
const playerFourCard = document.querySelectorAll(".playerFourCard");
let activeCards;
const cardsToExtraHand = [];
const cardsFromExtraHand = [];
// Game/round active and reset variables
let activeGame = false;
let activeRound = false;
let changeActivePlayer;

// ///// RESET GAME/ROUND FUNCTIONS ////////////////////////////

const clearTable = () => {
  activeRound = false;
  // activePlayerNum = 1; // set this somewhere else
  // activeCards = playerOneCard; // set this somewhere else
  leftOfDealerHand.length = 0;
  acrossFromDealerHand.length = 0;
  rightOfDealerHand.length = 0;
  dealerHand.length = 0;
  extraHand.length = 0;
  allHands.length = 0;
  aCard.forEach(val => {
    val.classList.remove("is-active");
    val.textContent = "";
  });
  eventsCards();
  // activeCards.forEach(val =>
  //   val.removeEventListener("click", selectDeselectCard)
  // );
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;
};

const resetGame = () => {
  clearTable();
  activeGame = false;
  dealButton.textContent = "Players?";
  beginEndGameButton.textContent = "Start";
  players.length = 0;
};

// ///// GAME MANAGEMENT FUNCTIONS ///////////////////////////////

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

// Generate players
const generatePlayers = () => {
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

// Begin play
const beginEndGame = () => {
  if (!activeGame) {
    activeGame = true;
    numPlayers = Number(num1to4.textContent);
    generatePlayers();
    playersButton.textContent = "Deal";
    beginEndGameButton.textContent = "End Game";
  } else if (activeGame && beginEndGameButton.textContent === "End Game") {
    beginEndGameButton.textContent = "Sure?";
  } else {
    resetGame();
  }
};
beginEndGameButton.addEventListener("click", beginEndGame);

const changeDealer = () => {
  // Check numPlayers and use players[index] to update position properties
  if (numPlayers === 4) {
    let player4position = players[3].position;
    players[3].position = players[2].position;
    players[2].position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player4position;
  } else if (numPlayers === 3) {
    let player3position = players[2].position;
    players[2].position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player3position;
  } else if (numPlayers === 2) {
    let player2position = players[1].position;
    players[1].position = players[0].position;
    players[0].position = player2position;
  }
  // Find the new "dealer" and set the property .activePlayer: true
  // ...set non-dealers' property .activePlayer: false
  players.forEach(val => {
    val.position === "dealer"
      ? (val.activePlayer = true)
      : (val.activePlayer = false);
    val.buyLastTurn = false;
    val.holdLastTurn = false;
  });
};

// End the round
const endRound = (playerNum, msgSchnautzFeuer, num31Or33) => {
  let message = ``;
  players.forEach(val => {
    message += `Player ${val.player} score: ${val.currentScore} 
`;
  });
  // A player with 31 (Schnautz) or 33 (Feuer) points wins the round immediately
  num31Or33
    ? alert(
        `${msgSchnautzFeuer}!!!

        Player ${playerNum} has ${num31Or33}!`
      )
    : alert(message);
  clearTable();
  changeDealer();
  playersButton.textContent = "Deal";
  beginEndGameButton.textContent = "End Game";
};

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
  console.log(
    `Player ${players[idxPlayers].player} score: ${
      players[idxPlayers].currentScore
    }`
  );

  // If the player's score is 31 or 33, the round ends immediately
  players[idxPlayers].currentScore === 31
    ? endRound(playerNum, "Schnautz", 31)
    : players[idxPlayers].currentScore === 33
    ? endRound(playerNum, "Feuer", 33)
    : changeActivePlayer();
};

// ///// CARD AND DECK FUNCTIONS ////////////////////////////////

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
        points:
          i === 4 || i === 5 || i === 6 ? 10 : i === 7 ? 11 : Number(ranks[i]),
        cardPosition: "",
        cardPlayer: null,
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

// Assign cards to players' hands and extra hand
const assignCardsToPlayers = () => {
  // Note: mutates the objects that newDeck() created inside an array
  // Select subset of shuffledDeck based on number of players
  dealtDeck = shuffledDeck.filter((cardObj, idx) => idx < numCards);
  // Check for the dealer in players array and bind that index to a variable
  let idxDealer = players.filter((val, idx) => {
    val.position === "dealer";
    return idx;
  });

  // Set cardObj properties .cardPosition and .cardPlayer
  // Set cardObj.cardPlayer value based on idxDealer value
  //    idxDealer === 0, then "dealer" is player 1, "left..." is 2, etc
  //    idxDealer === 1, then "dealer" is player 2, "left..." is 3, etc
  //    idxDealer === 2, then "dealer" is player 3, "left..." is 4, etc
  //    idxDealer === 3, then "dealer" is player 4, "left..." is 1, etc
  //    "extraHand" not in the players array--we set cardObj.cardPlayer = 0
  // Assign card objects to players' hands and extra hand
  switch (numCards) {
    case 15:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 5 || idx === 10) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayer = idxDealer === 3 ? 1 : idxDealer + 2;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 6 || idx === 11) {
          cardObj.cardPosition = "acrossFromDealerHand";
          cardObj.cardPlayer =
            idxDealer === 3 ? 2 : idxDealer === 2 ? 1 : idxDealer + 3;
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 7 || idx === 12) {
          cardObj.cardPosition = "rightOfDealerHand";
          cardObj.cardPlayer = idxDealer === 0 ? 4 : idxDealer;
          rightOfDealerHand.push(cardObj);
        } else if (idx === 3 || idx === 8 || idx === 13) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayer = idxDealer + 1;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          extraHand.push(cardObj);
          cardObj.cardPlayer = 0;
        }
      });
      allHands.push(
        extraHand,
        dealerHand,
        leftOfDealerHand,
        acrossFromDealerHand,
        rightOfDealerHand
      );
      break;
    case 12:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 4 || idx === 8) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayer = idxDealer === 2 ? 1 : idxDealer + 2;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 5 || idx === 9) {
          cardObj.cardPosition = "acrossFromDealerHand";
          cardObj.cardPlayer = idxDealer === 2 ? 2 : idxDealer === 1 ? 1 : 3;
          acrossFromDealerHand.push(cardObj);
        } else if (idx === 2 || idx === 6 || idx === 10) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayer = idxDealer + 1;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          cardObj.cardPlayer = 0;
          extraHand.push(cardObj);
        }
      });
      allHands.push(
        extraHand,
        dealerHand,
        leftOfDealerHand,
        acrossFromDealerHand
      );
      break;
    default:
      dealtDeck.forEach((cardObj, idx) => {
        if (idx === 0 || idx === 3 || idx === 6) {
          cardObj.cardPosition = "leftOfDealerHand";
          cardObj.cardPlayer = idxDealer === 1 ? 1 : 2;
          leftOfDealerHand.push(cardObj);
        } else if (idx === 1 || idx === 4 || idx === 7) {
          cardObj.cardPosition = "dealerHand";
          cardObj.cardPlayer = idxDealer + 1;
          dealerHand.push(cardObj);
        } else {
          cardObj.cardPosition = "extraHand";
          cardObj.cardPlayer = 0;
          extraHand.push(cardObj);
        }
      });
      allHands.push(extraHand, dealerHand, leftOfDealerHand);
      break;
  }
  for (let i = 1; i < allHands.length; i++) {
    updateScore(i);
  }
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
// Add event listeners to playerOneCard, etc., & extraCard NodeLists
extraCard.forEach(val => val.addEventListener("click", selectDeselectCard));
eventsCards = () => {
  activeCards.forEach(val => val.addEventListener("click", selectDeselectCard));
};

// Change the active player
changeActivePlayer = () => {
  let idx = activePlayerNum - 1; // Convert player number to zero-based index
  // Remove event listener for the current player's three cards
  activeCards.forEach(val =>
    val.removeEventListener("click", selectDeselectCard)
  );
  // Update players array of player objects -- player one is players[0], etc
  // Update player areas in DOM
  // Add event listeners to the next player's three cards
  activePlayerNum === 1
    ? // player two (players[1]) always follows player one (players[0])
      ((activePlayerNum = 2),
      (players[0].activePlayer = false),
      (players[1].activePlayer = true),
      playerOneArea.classList.remove("active-area"),
      playerTwoArea.classList.add("active-area"),
      (activeCards = playerTwoCard),
      eventsCards())
    : activePlayerNum === 2 && numCards === 9
    ? // 2 players: player one (players[0]) follows player two (players[1])
      ((activePlayerNum = 1),
      (players[1].activePlayer = false),
      (players[0].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard),
      eventsCards())
    : activePlayerNum === 2
    ? // 3/4 players: player three (players[2]) follows player two (players[1])
      ((activePlayerNum = 3),
      (players[1].activePlayer = false),
      (players[2].activePlayer = true),
      playerTwoArea.classList.remove("active-area"),
      playerThreeArea.classList.add("active-area"),
      (activeCards = playerThreeCard),
      eventsCards())
    : activePlayerNum === 3 && numCards === 12
    ? // 3 players: player one (players[0]) follows player three (players[2])
      ((activePlayerNum = 1),
      (players[2].activePlayer = false),
      (players[0].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard),
      eventsCards())
    : activePlayerNum === 3
    ? // 4 players: player four (players[3]) follows player three (players[2])
      ((activePlayerNum = 4),
      (players[2].activePlayer = false),
      (players[3].activePlayer = true),
      playerThreeArea.classList.remove("active-area"),
      playerFourArea.classList.add("active-area"),
      (activeCards = playerFourCard),
      eventsCards())
    : // player one (players[0]) always follows player four (players[3])
      ((activePlayerNum = 1),
      (players[3].activePlayer = false),
      (players[0].activePlayer = true),
      playerFourArea.classList.remove("active-area"),
      playerOneArea.classList.add("active-area"),
      (activeCards = playerOneCard),
      eventsCards());

  // Clear arrays for next player
  cardsToExtraHand.length = 0;
  cardsFromExtraHand.length = 0;
  // Check if current player used "buy" on last turn
  if (players[idx].buyLastTurn) {
    players[idx].buyLastTurn = false;
  }
  // Update idx with new value of activePlayerNum
  idx = activePlayerNum - 1;
  // Check whether to endRound() if the next player used "hold" on last turn
  if (players[idx].holdLastTurn) {
    // Set all .holdLastTurn properties to false - prevents repeating endRound
    players.forEach(val => (val.holdLastTurn = false));
    endRound();
  }
};

// Deal card objects
const deal = () => {
  if (activeGame && activeRound === false) {
    // CONSIDER FIX BELOW
    clearTable(); // Do we need clearTable() here?
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
    // console.log(extraHand);
  } else if (activeRound && dealButton.textContent === "Score") {
    // Temp code to call and test checkScore()
    // checkScore();
  }
};
dealButton.addEventListener("click", deal);

// ///// GAME PLAY FUNCTIONS ///////////////////////////////////

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
      } else {
        alert("Error: Unable to exchange one card");
      }
      styleBlackCards();
      updateScore(activePlayerNum);
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
        alert("Error: Unable to exchange three cards.");
      }
      styleBlackCards();
      updateScore(activePlayerNum);
    } else {
      alert("Error: Unable to exchange cards.");
    }
  } else {
    alert("Error: Unable to exchange cards.");
  }
  // console.log(extraHand);
};
exchangeButton.addEventListener("click", exchangeCards);

// Current player skips turn but cannot skip two turns in a row
const buy = () => {
  let idx = activePlayerNum - 1;
  // check if player used "buy" on last turn
  if (players[idx].buyLastTurn === true) {
    alert(`Player ${activePlayerNum} cannot buy this turn.`);
  } else {
    changeActivePlayer();
    players[idx].buyLastTurn = true;
  }
};
buyButton.addEventListener("click", buy);

// Current player skips turn and signals this round is ending
const hold = () => {
  let idx = activePlayerNum - 1;
  players[idx].holdLastTurn = true;
  changeActivePlayer();
  // Other players have one more turn (but not current player)
};
holdButton.addEventListener("click", hold);

// ///// KEEPERS ///////////////////////////////////////////////
// Alternatives for suits
// White club suit 	♧ 	U+2667 	&#9831 -- Black club suit 	♣ 	U+2663 	&clubs
// White diamond suit 	♢ 	U+2662 	&#9826 -- Black diamond suit 	♦ 	U+2666 	&diams
// White heart suit 	♡ 	U+2661 	&#9825 -- Black heart suit 	♥ 	U+2665 	&hearts
// White spade suit 	♤ 	U+2664 	&#9828 -- Black spade suit 	♠ 	U+2660 	&spade
