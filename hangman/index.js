const questionsAndAnswers = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the biggest bird?", answer: "Ostrich" },
  { question: "How many bones are in a shark's body?", answer: "Zero" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
];

const hint = document.querySelector("#hint");
const word = document.querySelector("#word");
const keyboard = document.querySelector("#keyboard");
const attemptCount = document.querySelector("#attempt-count");
const status = document.querySelector("#game-status");
const nextWordButton = document.querySelector("#next-word");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const maxAttempts = 6;

let currentQuestion;
let incorrectGuesses;
let guessedLetters;
let gameComplete;

function renderWord() {
  word.replaceChildren();

  for (const [index, letter] of [...currentQuestion.answer.toLowerCase()].entries()) {
    const slot = document.createElement("span");
    const isRevealed = guessedLetters.has(letter) || gameComplete;
    slot.className = "game__letter";
    slot.textContent = isRevealed ? letter : "";
    slot.setAttribute("aria-label", isRevealed ? letter : `Hidden letter ${index + 1}`);
    word.appendChild(slot);
  }

  word.setAttribute("aria-label", `${currentQuestion.answer.length} letter word`);
}

function finishGame(won) {
  gameComplete = true;
  keyboard.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  nextWordButton.disabled = false;
  status.textContent = won
    ? "Well done. You found the word."
    : `No guesses left. The word was ${currentQuestion.answer}.`;
  renderWord();
}

function updateKeyboard() {
  keyboard.replaceChildren();

  for (const letter of alphabet) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game__key";
    button.textContent = letter;
    button.disabled = guessedLetters.has(letter) || gameComplete;
    button.setAttribute("aria-label", `Guess ${letter}`);

    if (guessedLetters.has(letter)) {
      button.classList.add(currentQuestion.answer.toLowerCase().includes(letter)
        ? "is-correct"
        : "is-wrong");
    }

    button.addEventListener("click", () => handleGuess(letter));
    keyboard.appendChild(button);
  }
}

function handleGuess(letter) {
  if (gameComplete || guessedLetters.has(letter)) return;

  const isCorrect = currentQuestion.answer.toLowerCase().includes(letter);
  guessedLetters.add(letter);

  if (!isCorrect) {
    incorrectGuesses += 1;
    attemptCount.textContent = incorrectGuesses;
  }

  renderWord();
  updateKeyboard();

  const foundLetters = [...currentQuestion.answer.toLowerCase()].every((char) =>
    guessedLetters.has(char)
  );

  if (foundLetters) {
    finishGame(true);
  } else if (incorrectGuesses === maxAttempts) {
    finishGame(false);
  } else {
    status.textContent = isCorrect
      ? `Letter ${letter} revealed.`
      : `Letter ${letter} is not in the word.`;
  }
}

function startNewQuestion() {
  const previousQuestion = currentQuestion;
  do {
    currentQuestion =
      questionsAndAnswers[Math.floor(Math.random() * questionsAndAnswers.length)];
  } while (questionsAndAnswers.length > 1 && currentQuestion === previousQuestion);

  incorrectGuesses = 0;
  guessedLetters = new Set();
  gameComplete = false;
  hint.textContent = currentQuestion.question;
  attemptCount.textContent = "0";
  status.textContent = "";
  nextWordButton.disabled = true;
  renderWord();
  updateKeyboard();
  keyboard.querySelector("button")?.focus();
}

document.addEventListener("keydown", (event) => {
  if (event.repeat || !/^[a-z]$/i.test(event.key)) return;
  handleGuess(event.key.toLowerCase());
});

nextWordButton.addEventListener("click", startNewQuestion);
startNewQuestion();
