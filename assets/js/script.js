//Immediately invoked function expression (IIFE) pattern keeps our globals
// scoped to the function expression wrapper, off the real global.
(function () {
  // DOM elements
  const startBtn = document.querySelector(".start-btn");

  // Game variables
  let currentQuestion = 0;
  let score = 0;

  // Event listeners
  startBtn.addEventListener("click", onStartClick);

  function onStartClick() {
    console.log("start-btn clicked");
    startQuiz();
  }

  function startQuiz() {
    console.log("startQuiz()");
    initQuiz();
    showQuestion(currentQuestion);
  }

  function initQuiz() {
    console.log("initQuiz()");
    score = 0;
    currentQuestion = 0;
  }

  function showQuestion(index) {
    console.log("showQuestion() NYI");
  }
})(); // IIFE
