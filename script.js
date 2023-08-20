const GameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const buttons = document.querySelector(".grid").children;
  const resetButton = document.querySelector(".reset");

  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;

    GameController.playRound(selectedCell);
  }

  for (let button of buttons) {
    button.addEventListener("click", clickHandler);
  }
  const getButtons = () => buttons;
  const getBoard = () => board;
  const resetBoard = () => {
    for (i = 0; i < board.length; i++) {
      board[i] = 0;
    }
    GameController.reset();
    DisplayController.reset();
    DisplayController.displayGameState(board);
  };
  resetButton.addEventListener("click", resetBoard);
  return { getBoard, resetBoard, getButtons };
})();

const GameController = (() => {
  const board = GameBoard.getBoard();
  const players = [
    {
      name: "Player X",
      number: 1,
    },
    {
      name: "Player O",
      number: 2,
    },
  ];
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let currentPlayer = players[0];

  const switchPlayer = () => {
    currentPlayer.number === 2
      ? (currentPlayer = players[0])
      : (currentPlayer = players[1]);
    DisplayController.displayCurrentPlayer(currentPlayer.name);
  };

  const getCurrentPlayer = () => currentPlayer;

  const reset = () => {
    currentPlayer = players[0];
  };

  const checkCondition = (condition) => {
    let result = "";
    for (i = 0; i < 3; i++) {
      if (board[condition[i]] === 0) return;
      result += board[condition[i]];
    }
    return result === "111" || result === "222";
  };

  const playRound = (index) => {
    if (board[index] !== 0) return;
    board[index] = currentPlayer.number;
    DisplayController.displayGameState(board);
    if (winConditions.some(checkCondition)) {
      console.log(`${currentPlayer.name} is the winner`);
    }
    switchPlayer();
  };

  return { getCurrentPlayer, playRound, reset };
})();

const DisplayController = (() => {
  const playerDisplay = document.querySelector(".currentPlayer");
  const buttons = GameBoard.getButtons();

  const displayCurrentPlayer = (name) => {
    setMessageDisplay(`${name}'s Turn`);
  };

  const setMessageDisplay = (message) => {
    playerDisplay.textContent = message;
  };

  displayCurrentPlayer(GameController.getCurrentPlayer().name);

  const reset = () => {
    displayCurrentPlayer(GameController.getCurrentPlayer().name);
  };

  const displayGameState = (board) => {
    for (i = 0; i < board.length; i++) {
      switch (board[i]) {
        case 0:
          buttons[i].className = "blank";
          break;
        case 1:
          buttons[i].className = "token1";
          break;
        case 2:
          buttons[i].className = "token2";
          break;
      }
    }
  };

  return { displayCurrentPlayer, displayGameState, reset };
})();
