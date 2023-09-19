import { countries, countryCodes } from "./data.js";

export function mainMessage(msg) {
  document.querySelector("#score").textContent = msg;
}

export function welcomeMode() {
  document.querySelector("#action").textContent = "▶️ NOUVEAU JEU";
  document.querySelector("#content").classList.add("hidden");
}

export function gameMode() {
  updateScore(0);
  document.querySelector("#action").textContent = "⏹️ QUITTER";
  document.querySelector("#content").classList.remove("hidden");
}

export function updateScore(score) {
  document.querySelector("#score").textContent = `SCORE ${score}`;
}

export function updateState(state) {
  updateScore(state.score);
  document.querySelector("#quiz_content").textContent =
    countries[state.questionCode].toUpperCase();
  for (let index in state.answerCodes) {
    document.querySelector(`#answer${index}`).innerHTML = `<img
    src="https://flagcdn.com/224x168/${state.answerCodes[index]}.png"
    alt="Réponse ${index}" />`;
  }
}

export function highlightAnswer(index, isGood) {
    let answerClass;
    if (isGood) {
        answerClass = "goodanswer";
    } else {
        answerClass = "badanswer";
    }
    document.querySelector(`#answer${index}`).classList.add(answerClass);
    setTimeout(
() => 
document.querySelector(`#answer${index}`).classList.remove(answerClass),
2000
    );
}

export function drawRemainingTime(percentage) {
  const canvas = document.querySelector("#progress");
  const context = canvas.getContext("2d");
  context.clearRect(0,0,500,50);
  context.fillStyle = "blue";
  context.fillRect(0,0,500*percentage,50);
}