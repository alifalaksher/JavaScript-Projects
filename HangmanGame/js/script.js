const keyboardDiv = document.querySelector(".keyboard");
const inGuess = document.querySelector(".guesses-text b");
const hangmanSvg = document.querySelector(".hangman-box img");
const wordDis = document.querySelector(".word-display");
const gameModel = document.querySelector(".game-model");
const playAgain = document.querySelector(".play-again");

let currentWord,
  wrongGuess = 0,
  maxVal = 6,
  correctLetter;
const resetGame = () => {
  correctLetter = [];
  wrongGuess = 0;
  inGuess.innerText = `${wrongGuess} / ${maxVal}`;
  hangmanSvg.src = `./images/hangman-0.svg`;
  gameModel.classList.remove("show");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDis.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};
const getRandomWorld = () => {
  const { word, hint } = words[Math.floor(Math.random() * words.length)];
  currentWord = word;
  const hintline = (document.querySelector(".hint-text b").innerText = hint);
  resetGame();
};

const gameOver = (isVectory) => {
  setTimeout(() => {
    const modelText = isVectory
      ? `you found the word: `
      : `The Correct Word Was: `;
    gameModel.querySelector("img").src = `images/${
      isVectory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h4").innerText = `${
      isVectory ? "Congrates" : "Game Over!"
    }`;
    gameModel.querySelector(
      "img"
    ).innerHTML = `${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
  }, 300);
};
const initGame = (button, clickletter) => {
  if (currentWord.includes(clickletter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickletter) {
        correctLetter.push(letter);
        wordDis.querySelectorAll("li")[index].innerText = letter;
        wordDis.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuess++;
    hangmanSvg.src = `./images/hangman-${wrongGuess}.svg`;
  }
  button.disabled = true;
  inGuess.innerText = `${wrongGuess} / ${maxVal}`;

  if (wrongGuess === maxVal) return gameOver(false);
  if (correctLetter.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWorld();

playAgain.addEventListener("click", getRandomWorld);
