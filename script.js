const gameBoard = (function gameBoard() {
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

function GameController() {
  const board = gameBoard;
  const playerDisplay = document.querySelector(".currentPlayer");
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

  const displayCurrentPlayer = () => {
    playerDisplay.textContent = currentPlayer;
  };

  displayCurrentPlayer();

  const switchPlayer = () => {
    currentPlayer === 2 ? (currentPlayer = 1) : (currentPlayer = 2);
    displayCurrentPlayer();
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkCondition = (condition) => {
    let result = "";
    for (i = 0; i < 3; i++) {
      if (board.getBoard()[condition[i]] === 0) return;
      result += board.getBoard()[condition[i]];
    }
    if (result === "111" || result === "222") return true;
    return false;
  };

  const playRound = (index) => {
    if (board.getBoard()[index] !== 0) return;
    board.getBoard()[index] = currentPlayer;
    board.displayGameState(board.getBoard());
    if (winConditions.some(checkCondition)) {
      console.log(`${currentPlayer} is the winner`);
    }
    switchPlayer();
  };

  return { getCurrentPlayer, playRound };
}

function MainModule() {
  const buttons = document.querySelector(".grid").children;
  const game = GameController();
  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;

    game.playRound(selectedCell);
  }
  for (let button of buttons) {
    button.addEventListener("click", clickHandler);
  }
}
MainModule();

// let board = [1, 1, 1, 0, 0, 0, 0, 0, 0];
// const winConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// const checkCondition = (condition) => {
//   let result = "";
//   for (i = 0; i < 3; i++) {
//     if (board[condition[i]] === 0) return;
//     result += board[condition[i]];
//   }
//   if (result === "111" || result === "222") return true;
//   return false;
// };

// console.log(winConditions.some(checkCondition));
