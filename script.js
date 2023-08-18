function gameBoard() {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let container = document.querySelector(".grid");
  let buttons = container.children;
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
  return { displayGameState, getBoard };
}

function ModuleOfStuff() {
  const board = gameBoard();
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
    board.getBoard()[index] = currentPlayer;
    switchPlayer();
    board.displayGameState(board.getBoard());
  };
  return { switchPlayer, getCurrentPlayer, playRound };
}

function MainModule() {
  let container = document.querySelector(".grid");
  let buttons = container.children;
  const stuff = ModuleOfStuff();
  const board = gameBoard();
  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;
    stuff.playRound(selectedCell);
  }

  for (let button of buttons) {
    button.addEventListener("click", clickHandler);
  }
  board.displayGameState(board.getBoard());
}
MainModule();
