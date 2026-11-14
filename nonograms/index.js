const puzzles = [
  {
    name: "Tree",
    image: "./assets/tree.jpg",
    solution: [
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
    ],
  },
  {
    name: "Lion",
    image: "./assets/leo.jpg",
    solution: [
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  },
  {
    name: "Pig",
    image: "./assets/pig.jpg",
    solution: [
      [1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
    ],
  },
  {
    name: "Duck",
    image: "./assets/duck.jpg",
    solution: [
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 1],
      [0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  },
  {
    name: "Rose",
    image: "./assets/rose.jpg",
    solution: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },
];

const columnHints = document.querySelector("#column-hints");
const rowHints = document.querySelector("#row-hints");
const board = document.querySelector("#game-board");
const status = document.querySelector("#puzzle-status");
const durationElement = document.querySelector("#duration");
const soundCheckbox = document.querySelector("#sound-checkbox");
const picker = document.querySelector("#puzzle-picker");
const pickButton = document.querySelector("#pick-picture");
const restartButton = document.querySelector("#restart");
const sounds = {
  fill: new Audio("./assets/black.mp3"),
  empty: new Audio("./assets/white.mp3"),
  win: new Audio("./assets/win.mp3"),
  click: new Audio("./assets/click.mp3"),
};

let activePuzzleIndex = 0;
let cellStates = [];
let startTime = null;
let timerInterval = null;
let soundEnabled = soundCheckbox.checked;
let puzzleComplete = false;

function getRuns(cells) {
  const runs = [];
  let count = 0;

  for (const cell of [...cells, 0]) {
    if (cell) {
      count += 1;
    } else if (count > 0) {
      runs.push(count);
      count = 0;
    }
  }

  return runs.length ? runs : [0];
}

function getPuzzleColumns(solution) {
  return solution[0].map((_, columnIndex) =>
    solution.map((row) => row[columnIndex])
  );
}

function renderHints(container, lines, label) {
  container.replaceChildren();

  lines.forEach((line, index) => {
    const clue = document.createElement("div");
    const numbers = getRuns(line);
    clue.className = "clue-line";
    clue.setAttribute(
      "aria-label",
      `${label} ${index + 1}: ${numbers.filter((number) => number > 0).join(", ") || "no filled cells"}`
    );

    numbers.forEach((number) => {
      if (number > 0) {
        const value = document.createElement("span");
        value.textContent = number;
        value.setAttribute("aria-hidden", "true");
        clue.appendChild(value);
      }
    });

    container.appendChild(clue);
  });
}

function renderPicker() {
  picker.replaceChildren();

  puzzles.forEach((puzzle, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const name = document.createElement("span");

    button.type = "button";
    button.className = `puzzle-choice${index === activePuzzleIndex ? " is-active" : ""}`;
    button.setAttribute("aria-pressed", String(index === activePuzzleIndex));
    image.src = puzzle.image;
    image.alt = "";
    name.textContent = puzzle.name;
    button.append(image, name);
    button.addEventListener("click", () => {
      if (soundEnabled) playSound(sounds.click);
      activePuzzleIndex = index;
      picker.hidden = true;
      pickButton.setAttribute("aria-expanded", "false");
      renderPuzzle();
    });
    picker.appendChild(button);
  });
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function updateTimer() {
  if (startTime === null) return;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  durationElement.textContent = formatTime(elapsed);
}

function resetTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  startTime = null;
  durationElement.textContent = "0:00";
}

function startTimer() {
  if (startTime !== null) return;
  startTime = Date.now();
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 1000);
}

function isSolved(solution) {
  return solution.every((row, rowIndex) =>
    row.every((answer, columnIndex) =>
      answer === 0 || cellStates[rowIndex][columnIndex] === 1
    )
  );
}

function updateCellLabel(cell, rowIndex, columnIndex, state, answer) {
  const mark = state ? "selected" : "unmarked";
  const result = state === 1 && answer === 0 ? ", incorrect" : "";
  cell.setAttribute(
    "aria-label",
    `Row ${rowIndex + 1}, column ${columnIndex + 1}, ${mark}${result}`
  );
  cell.setAttribute("aria-pressed", String(state !== 0));
}

function markCell(rowIndex, columnIndex, cell) {
  if (puzzleComplete) return;
  startTimer();

  const currentState = cellStates[rowIndex][columnIndex];
  const nextState = currentState === 0 ? 1 : 0;
  const answer = puzzles[activePuzzleIndex].solution[rowIndex][columnIndex];
  cellStates[rowIndex][columnIndex] = nextState;
  cell.classList.toggle("is-filled", nextState === 1 && answer === 1);
  cell.classList.toggle("is-mistake", nextState === 1 && answer === 0);
  updateCellLabel(cell, rowIndex, columnIndex, nextState, answer);

  if (soundEnabled) {
    playSound(answer === 1 ? sounds.fill : sounds.empty);
  }

  if (isSolved(puzzles[activePuzzleIndex].solution)) {
    puzzleComplete = true;
    window.clearInterval(timerInterval);
    updateTimer();
    if (soundEnabled) playSound(sounds.win);
    status.textContent = `Puzzle solved in ${durationElement.textContent}. Choose another picture or restart.`;
    board.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  } else {
    status.textContent = "Keep going. The clues show runs of filled squares.";
  }
}

function renderBoard(solution) {
  board.replaceChildren();

  solution.forEach((row, rowIndex) => {
    const boardRow = document.createElement("div");
    boardRow.className = "board-row";
    boardRow.setAttribute("role", "row");

    row.forEach((answer, columnIndex) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "board-cell";
      cell.setAttribute("role", "gridcell");
      updateCellLabel(cell, rowIndex, columnIndex, 0, answer);
      cell.addEventListener("click", () => markCell(rowIndex, columnIndex, cell));
      boardRow.appendChild(cell);
    });

    board.appendChild(boardRow);
  });
}

function renderPuzzle() {
  const puzzle = puzzles[activePuzzleIndex];
  cellStates = puzzle.solution.map((row) => row.map(() => 0));
  puzzleComplete = false;
  resetTimer();
  status.textContent = `Solve the ${puzzle.name.toLowerCase()} using the row and column clues.`;
  renderHints(columnHints, getPuzzleColumns(puzzle.solution), "Column");
  renderHints(rowHints, puzzle.solution, "Row");
  renderBoard(puzzle.solution);
  renderPicker();
}

pickButton.addEventListener("click", () => {
  picker.hidden = !picker.hidden;
  pickButton.setAttribute("aria-expanded", String(!picker.hidden));
});

restartButton.addEventListener("click", () => {
  if (soundEnabled) playSound(sounds.click);
  renderPuzzle();
});

soundCheckbox.addEventListener("change", () => {
  soundEnabled = soundCheckbox.checked;
  if (soundEnabled) playSound(sounds.click);
});

renderPuzzle();
