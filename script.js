gameBoard = {
  gameBoard: [1, 2, 2, 1, 2, 1, 2, 1, 1],
};

let container = document.querySelector(".grid");
let buttons = container.children;
function displayGameState(array) {
  for (i = 0; i < array.length; i++) {
    switch (array[i]) {
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
}

function ModuleOfStuff() {
  let currentPlayer = 1;
  const switchPlayer = () => {
    currentPlayer === 2 ? (currentPlayer = 1) : (currentPlayer = 2);
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };
  return switchPlayer, getCurrentPlayer;
}

function playRound() {
  //Get current player
  //Pick spot
  //Switch player
  //Update board state
}

function selectSpot() {
  playerNumber = 2;
  gameBoard.gameBoard[this.dataset.index] = playerNumber;
  displayGameState(gameBoard.gameBoard);
}

for (let button of buttons) {
  button.addEventListener("click", selectSpot);
}

displayGameState(gameBoard.gameBoard);
