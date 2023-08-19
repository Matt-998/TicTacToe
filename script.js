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

function ModuleOfStuff() {
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
  const playRound = (index) => {
    if (board.getBoard()[index] !== 0) return;
    board.getBoard()[index] = currentPlayer;
    switchPlayer();
    board.displayGameState(board.getBoard());
  };
  return { getCurrentPlayer, playRound };
}

function MainModule() {
  const buttons = document.querySelector(".grid").children;
  const stuff = ModuleOfStuff();
  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;

    stuff.playRound(selectedCell);
  }
  for (let button of buttons) {
    button.addEventListener("click", clickHandler);
  }
}
MainModule();
