import * as game from "./game.js";
import * as display from "./display.js";
import { loadCountries } from "./data.js";


let timeout = false;
let timerInterval;

function verifyAnswer() {
  if (timeout) {
    return;
  }
  const userAnswerIndex = this.id.slice(-1);
  const userAnswer = game.state.answerCodes[userAnswerIndex];
  let isGood = game.checkAnswerAndUpdateScore(userAnswer);
  display.highlightAnswer(userAnswerIndex, isGood);
setTimeout(nextGameStep, 2000);

}

function startTimer() {
  let time = 5000;
  timerInterval = setInterval(
    () => {
      time -= 30;
      if (time <= 0) {
        clearInterval(timerInterval);
        questionTimeout(); 
      } else {
        display.drawRemainingTime(time / 5000);
      }
    }, 30);
}

function questionTimeout() {
timeout = true;
timerInterval = null
nextGameStep();
}


function nextGameStep() {
    if (game.state.currentQuestion <= game.state.totalQuestions) {
        game.nextQuestion();
        display.updateState(game.state); 
        startTimer();
      } else {
        display.mainMessage(`GAME OVER - SCORE : ${game.state.score}`);
        gameIntro();
      }
      timeout = false;
    }


function startGame() {
  display.gameMode();
  let actionButton = document.querySelector("#action");
  actionButton.onclick = gameIntro;
  game.newGame(10);
  document
    .querySelectorAll("#answers button")
    .forEach((button) => (button.onclick = verifyAnswer));
  display.updateState(game.state);
  startTimer();
}

function gameIntro() {
  display.welcomeMode();
  let actionButton = document.querySelector("#action");
  actionButton.onclick = startGame;
}

loadCountries();
window.onload = gameIntro;
