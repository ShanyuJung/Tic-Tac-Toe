const circleClass = "circle";
const xClass = "x";
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningTextJS = document.getElementById("winningText");
const winningMessageJS = document.getElementById("winning-message");
const restartButtonJS = document.getElementById("restartButton");
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let circleTurn;

setGame();

function setGame() {
  cellElements.forEach((cell) => {
    circleTurn = false;
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  });
  setBoardClass();
  winningMessageJS.classList.remove("show");
}

function handleclick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? circleClass : xClass;
  drawMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    switchTurns();
    setBoardClass();
  }

  //console.log(cell);
}

function drawMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardClass() {
  boardElement.classList.remove("x");
  boardElement.classList.remove("circle");
  if (circleTurn) {
    boardElement.classList.add("circle");
  } else {
    boardElement.classList.add("x");
  }
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endgame(draw) {
  if (draw) {
    winningTextJS.innerHTML = "DRAW!";
  } else {
    winningTextJS.innerHTML = `${circleTurn ? "O" : "X"}'s WINS!`;
  }
  winningMessageJS.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

restartButtonJS.addEventListener("click", setGame);
