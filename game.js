import { countryCodes } from "./data.js";

export let state = {};

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function nextQuestion() {
  state.currentQuestion += 1;
  startTimer();
  /* state.answerCodes = [];
  while (state.answerCodes.length != 4) {
    let nextIndex = randomInt(countryCodes.length);
    let nextAnswer = countryCodes[nextIndex];*/
    if (state.answerCodes.indexOf(nextAnswer) == -1) {
      state.answerCodes.push(nextAnswer);
    }
  //}
  state.questionCode = state.answerCodes[randomInt(4)];
  return state;
}

export function checkAnswerAndUpdateScore(answer) {
  if (answer === state.questionCode) {
    state.score += 1;
    return true;
  } else {
    return false;
  }
}

export function newGame(totalQuestions) {
  state.score = 0;
  state.currentQuestion = 0;
  state.totalQuestions = totalQuestions;
  return nextQuestion();
}
