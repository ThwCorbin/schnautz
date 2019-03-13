import { v, num1to4Msg } from "./app.js";

const mycroftNames = ["Freddie Cat", "Nellie Dog", "Lilly Gator"];

// Update variables after adding or removing players
const updateVariables = () => {
  v.playerNames.length === 4
    ? ((num1to4Msg.textContent = "4"), (v.numPlayers = 4), (v.numCards = 15))
    : v.playerNames.length === 3
    ? ((num1to4Msg.textContent = "3"), (v.numPlayers = 3), (v.numCards = 12))
    : v.playerNames.length === 2
    ? ((num1to4Msg.textContent = "2"), (v.numPlayers = 2), (v.numCards = 9))
    : v.playerNames.length === 1
    ? ((num1to4Msg.textContent = "1"), (v.numPlayers = 1), (v.numCards = null))
    : ((num1to4Msg.textContent = "Add players"),
      (v.numPlayers = null),
      (v.numCards = null));
};

// Add human players
const addPlayers = name => {
  if (!v.activeGame) {
    if (v.playerNames.length < 4) {
      v.playerNames.push(name);
      console.log(`Welcome to the game, ${name}!`);
      updateVariables();
    } else {
      console.log("There are already four players.");
    }
  }
};

// Remove human players
const removePlayers = name => {
  if (!v.activeGame && v.playerNames.length) {
    let listPlayers = "";
    v.playerNames.forEach((playerName, idx) => {
      playerName === name
        ? v.playerNames.splice(idx, 1)
        : (listPlayers += `, ${playerName}`);
    });
    updateVariables();
    console.log(`Current players include${listPlayers}.`);
  }
};

// Add computer players if we don't have enough humans
const getPlayerNames = () => {
  if (v.numPlayers === 2 && v.playerNames.length < 2) {
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
