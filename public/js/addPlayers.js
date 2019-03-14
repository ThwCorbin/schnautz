import {
  v,
  textPlayerName
  // num1to4Msg
} from "./app.js";

const mycroftNames = ["Freddie Cat", "Nellie Dog", "Lilly Gator"];

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

// Add human players
const addPlayers = e => {
  e.preventDefault();
  let name = textPlayerName.value;
  if (!v.activeGame) {
    if (v.playerNames.length === 4) {
      console.log("There are already four players");
    } else if (v.playerNames.includes(name)) {
      console.log("That name is already taken");
    } else {
      v.playerNames.push(textPlayerName.value);
      console.log(`Welcome to the game, ${textPlayerName.value}!`);
      console.log(v.playerNames);
      updateVariables();
    }
  }
  textPlayerName.value = "";
};

// Remove human players
const removePlayers = e => {
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
    msg += `${name} is not a player. `;
  }

  if (!v.activeGame) {
    v.playerNames.forEach(playerName => {
      listPlayers += `, ${playerName}`;
    });
    console.log(`${msg}Current players include${listPlayers}.`);
  }
  textPlayerName.value = "";
};

// Add computer players if we don't have enough humans
const getPlayerNames = () => {
  if (v.numPlayers === 1 && v.playerNames.length < 2) {
    v.playerNames.push(mycroftNames[0]);
  } else if (v.numPlayers === 3 && v.playerNames.length < 3) {
    v.playerNames.length === 1
      ? v.playerNames.push(mycroftNames[0], mycroftNames[1])
      : v.playerNames.push(mycroftNames[0]);
  } else if (v.numPlayers === 4 && v.playerNames.length < 4) {
    v.playerNames.length === 1
      ? v.playerNames.push(...mycroftNames)
      : v.playerNames.length === 2
      ? v.playerNames.push(mycroftNames[0], mycroftNames[1])
      : v.playerNames.push(mycroftNames[0]);
  }
};

export { addPlayers as default, removePlayers, getPlayerNames };
