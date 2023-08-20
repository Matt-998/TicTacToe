const GameBoard = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const buttons = document.querySelector(".grid").children;
  const resetButton = document.querySelector(".reset");
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
  const getBoard = () => board;
  const resetBoard = () => {
    for (i = 0; i < board.length; i++) {
      board[i] = 0;
    }
    displayGameState(board);
  };
  resetButton.addEventListener("click", resetBoard);
  return { displayGameState, getBoard, resetBoard };
})();

const GameController = (() => {
  const board = GameBoard.getBoard();
  const players = [
    {
      name: "playerOne",
      number: 1,
    },
    {
      name: "playerTwo",
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
  let currentPlayer = players[0].number;

  const switchPlayer = () => {
    currentPlayer === 2 ? (currentPlayer = 1) : (currentPlayer = 2);
    DisplayController.displayCurrentPlayer(); //FIX ME
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkCondition = (condition) => {
    let result = "";
    for (i = 0; i < 3; i++) {
      if (board[condition[i]] === 0) return;
      result += board[condition[i]];
    }
    if (result === "111" || result === "222") return true;
    return false;
  };

  const playRound = (index) => {
    if (board[index] !== 0) return;
    board[index] = currentPlayer;
    GameBoard.displayGameState(board);
    if (winConditions.some(checkCondition)) {
      console.log(`${currentPlayer} is the winner`);
    }
    switchPlayer();
  };

  return { getCurrentPlayer, playRound };
})();

const DisplayController = (() => {
  const buttons = document.querySelector(".grid").children;
  const playerDisplay = document.querySelector(".currentPlayer");

  const displayCurrentPlayer = () => {
    playerDisplay.textContent = GameController.getCurrentPlayer();
  };

  displayCurrentPlayer();

  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;

    GameController.playRound(selectedCell);
  }

  for (let button of buttons) {
    button.addEventListener("click", clickHandler);
  }

  return { displayCurrentPlayer };
})();
DisplayController;
