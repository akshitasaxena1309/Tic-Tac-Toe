const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvent = "all";

    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let ans = "";
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        ans = "X";
      } else {
        ans = "0";
      }

      boxes.forEach((box) => {
        box.style.pointerEvent = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (ans !== "") {
    gameInfo.innerText = `winner Player - ${ans}`;
    newGameBtn.classList.add("active");
    return;
  }

  let fillcount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillcount++;
    }
  });
  if (fillcount === 9) {
    gameInfo.innerText = "Game Tied!!!";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvent = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
