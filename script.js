gameBoard = {
  gameBoard: [1, 2, 2, 1, 2, 1, 2, 1, 1],
};

let container = document.querySelector(".grid");
let buttons = container.children;
console.log(buttons);
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

displayGameState(gameBoard.gameBoard);
