import { gameState } from "./gameStatus.js";

const messageArea = document.querySelector(".messageArea");
const textPlayerName = document.querySelector(".textPlayerName");
const myPetNames = ["Freddie Cat", "Nellie Dog", "Gator Face"];

//> Update variables after adding or removing players
const updateVariables = () => {
  gameState.playerNames.length === 4
    ? ((gameState.numPlayers = 4),
      (gameState.numCards = 15),
      (textPlayerName.placeholder = ""))
    : gameState.playerNames.length === 3
    ? ((gameState.numPlayers = 3),
      (gameState.numCards = 12),
      (textPlayerName.placeholder = "Add Players"))
    : gameState.playerNames.length === 2
    ? ((gameState.numPlayers = 2),
      (gameState.numCards = 9),
      (textPlayerName.placeholder = "Add Players"))
    : gameState.playerNames.length === 1
    ? ((gameState.numPlayers = 1),
      (gameState.numCards = null),
      (textPlayerName.placeholder = "Add Players"))
    : ((gameState.numPlayers = null),
      (gameState.numCards = null),
      (textPlayerName.placeholder = "Add Players"));
};

//> Add a human player
const addHuman = (e) => {
  e.preventDefault();
  let name = textPlayerName.value;
  if (!gameState.activeGame) {
    if (gameState.playerNames.length === 4) {
      messageArea.innerHTML = `<h5>There are already four players</h5>`;
    } else if (gameState.playerNames.includes(name)) {
      messageArea.innerHTML = `<h5>That name is already taken</h5>`;
    } else {
      gameState.playerNames.push(textPlayerName.value);
      messageArea.innerHTML = `<h5>Welcome to the game, ${textPlayerName.value}!</h5>`;
      updateVariables();
    }
  }
  textPlayerName.value = "";
};

//> Remove a human player
const removeHuman = (e) => {
  e.preventDefault();
  let name = textPlayerName.value;
  let msg = "";
  let listPlayers = "";

  if (!gameState.activeGame && gameState.playerNames.includes(name)) {
    gameState.playerNames.forEach((playerName, idx) => {
      if (playerName === name) gameState.playerNames.splice(idx, 1);
    });
    updateVariables();
  } else if (!gameState.activeGame) {
    msg += `<h5>${name} is not a player. </h5>`;
  }

  if (!gameState.activeGame) {
    gameState.playerNames.forEach((playerName) => {
      listPlayers += `<li>- ${playerName}</li>`;
    });
    messageArea.innerHTML = `<ul>${msg}Current players:
    ${listPlayers}
    </ul>`;
  }
  textPlayerName.value = "";
};

//> Add an animal player
const addAnimal = () => {
  let msg = "";
  let listPlayers = "";
  if (!gameState.activeGame) {
    if (gameState.playerNames.length === 4) {
      messageArea.innerHTML = `<h5>There are already four players</h5>`;
      // If there is at least one human, add one animal
    } else if (gameState.playerNames.length > 0) {
      !gameState.playerNames.includes(myPetNames[0])
        ? gameState.playerNames.push(myPetNames[0])
        : !gameState.playerNames.includes(myPetNames[1])
        ? gameState.playerNames.push(myPetNames[1])
        : gameState.playerNames.push(myPetNames[2]);
      // Update numbers/text and print current players to the message area
      updateVariables();
      gameState.playerNames.forEach((playerName) => {
        listPlayers += `<li>- ${playerName}</li>`;
      });
      messageArea.innerHTML = `<ul>${msg}Current players:
      ${listPlayers}
      </ul>`;
    } else {
      messageArea.innerHTML = `<h5>Add a human player first</h5>`;
    }
  }
};

//> Remove an animal player
const removeAnimal = () => {
  let animal = "";
  let msg = "";
  let listPlayers = "";
  if (!gameState.activeGame) {
    gameState.playerNames.includes(myPetNames[2])
      ? (animal = myPetNames[2])
      : gameState.playerNames.includes(myPetNames[1])
      ? (animal = myPetNames[1])
      : gameState.playerNames.includes(myPetNames[0])
      ? (animal = myPetNames[0])
      : (animal = "");
  }
  //* If an animal is one of the players, remove the animal
  if (animal) {
    gameState.playerNames.forEach((playerName, idx) => {
      if (playerName === animal) gameState.playerNames.splice(idx, 1);
    });
    //* Update numbers/text and print current players to the message area
    updateVariables();
    gameState.playerNames.forEach((playerName) => {
      listPlayers += `<li>- ${playerName}</li>`;
    });
    messageArea.innerHTML = `<ul>${msg}Current players:
    ${listPlayers}
    </ul>`;
  } else if (!gameState.activeGame) {
    messageArea.innerHTML = `<h5>There are no animals playing</h5>`;
  }
};

//> Add an animal player if we don't have two players
const getAnimal = () => {
  if (gameState.numPlayers === 1) {
    //? Do we need to add this above (...&& gameState.playerNames.length < 2)
    gameState.playerNames.push(myPetNames[0]);
    updateVariables();
  }
};

export {
  addHuman as default,
  removeHuman,
  addAnimal,
  removeAnimal,
  getAnimal,
  myPetNames,
  messageArea,
  textPlayerName
};
