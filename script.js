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

function selectSpot() {
  playerNumber = 2;
  gameBoard.gameBoard[this.getAttribute("data-index")] = playerNumber;
  displayGameState(gameBoard.gameBoard);
}

for (let button of buttons) {
  button.addEventListener("click", selectSpot);
}

displayGameState(gameBoard.gameBoard);
