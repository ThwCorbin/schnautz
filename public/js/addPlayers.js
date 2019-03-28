import { v, messageArea, textPlayerName } from "./app.js";

const myPetNames = ["Freddie Cat", "Nellie Dog", "Gator Face"];

// Update variables after adding or removing players
const updateVariables = () => {
  v.playerNames.length === 4
    ? ((v.numPlayers = 4), (v.numCards = 15), (textPlayerName.placeholder = ""))
    : v.playerNames.length === 3
    ? ((v.numPlayers = 3),
      (v.numCards = 12),
      (textPlayerName.placeholder = "Add Players"))
    : v.playerNames.length === 2
    ? ((v.numPlayers = 2),
      (v.numCards = 9),
      (textPlayerName.placeholder = "Add Players"))
    : v.playerNames.length === 1
    ? ((v.numPlayers = 1),
      (v.numCards = null),
      (textPlayerName.placeholder = "Add Players"))
    : ((v.numPlayers = null),
      (v.numCards = null),
      (textPlayerName.placeholder = "Add Players"));
};

// Add a human player
const addHuman = e => {
  e.preventDefault();
  let name = textPlayerName.value;
  if (!v.activeGame) {
    if (v.playerNames.length === 4) {
      messageArea.innerHTML = `<h5>There are already four players</h5>`;
    } else if (v.playerNames.includes(name)) {
      messageArea.innerHTML = `<h5>That name is already taken</h5>`;
    } else {
      v.playerNames.push(textPlayerName.value);
      messageArea.innerHTML = `<h5>Welcome to the game, ${
        textPlayerName.value
      }!</h5>`;
      updateVariables();
    }
  }
  textPlayerName.value = "";
};

// Remove a human player
const removeHuman = e => {
  e.preventDefault();
  let name = textPlayerName.value;
  let msg = "";
  let listPlayers = "";

  if (!v.activeGame && v.playerNames.includes(name)) {
    v.playerNames.forEach((playerName, idx) => {
      if (playerName === name) v.playerNames.splice(idx, 1);
    });
    updateVariables();
  } else if (!v.activeGame) {
    msg += `<h5>${name} is not a player. </h5>`;
  }

  if (!v.activeGame) {
    v.playerNames.forEach(playerName => {
      listPlayers += `<li>- ${playerName}</li>`;
    });
    messageArea.innerHTML = `<ul>${msg}Current players:
    ${listPlayers}
    </ul>`;
  }
  textPlayerName.value = "";
};

// Add an animal player
const addAnimal = () => {
  let msg = "";
  let listPlayers = "";
  if (!v.activeGame) {
    if (v.playerNames.length === 4) {
      messageArea.innerHTML = `<h5>There are already four players</h5>`;
      // If there is at least one human, add one animal
    } else if (v.playerNames.length > 0) {
      !v.playerNames.includes(myPetNames[0])
        ? v.playerNames.push(myPetNames[0])
        : !v.playerNames.includes(myPetNames[1])
        ? v.playerNames.push(myPetNames[1])
        : v.playerNames.push(myPetNames[2]);
      // Update numbers/text and print current players to the message area
      updateVariables();
      v.playerNames.forEach(playerName => {
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

// Remove an animal player
const removeAnimal = () => {
  let animal = "";
  let msg = "";
  let listPlayers = "";
  if (!v.activeGame) {
    v.playerNames.includes(myPetNames[2])
      ? (animal = myPetNames[2])
      : v.playerNames.includes(myPetNames[1])
      ? (animal = myPetNames[1])
      : v.playerNames.includes(myPetNames[0])
      ? (animal = myPetNames[0])
      : (animal = "");
  }
  // If an animal is one of the players, remove the animal
  if (animal) {
    v.playerNames.forEach((playerName, idx) => {
      if (playerName === animal) v.playerNames.splice(idx, 1);
    });
    // Update numbers/text and print current players to the message area
    updateVariables();
    v.playerNames.forEach(playerName => {
      listPlayers += `<li>- ${playerName}</li>`;
    });
    messageArea.innerHTML = `<ul>${msg}Current players:
    ${listPlayers}
    </ul>`;
  } else if (!v.activeGame) {
    messageArea.innerHTML = `<h5>There are no animals playing</h5>`;
  }
};

// Add an animal player if we don't have enough humans (two player minimum)
const getAnimal = () => {
  if (v.numPlayers === 1 && v.playerNames.length < 2) {
    v.playerNames.push(myPetNames[0]);
    updateVariables();
  }
};

export {
  addHuman as default,
  removeHuman,
  addAnimal,
  removeAnimal,
  getAnimal,
  myPetNames
};
