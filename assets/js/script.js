//Immediately invoked function expression (IIFE) pattern keeps our globals
// scoped to the function expression wrapper, off the real global.
(function () {
  // DOM elements
  const el = {
    start: {
      container: document.querySelector(".start"),
      button: document.querySelector(".start-btn"),
    },
    question: {
      container: document.querySelector(".questions"),
      header: document.querySelector(".questions h2"),
      answerBtns: document.querySelectorAll(".answer-btn"),
    },
  };

  // Game variables
  let currentQuestion = 0;
  let score = 0;

  // Event listeners
  el.start.button.addEventListener("click", onStartClick);

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
    // set score and question index back to initial values
    score = 0;
    currentQuestion = 0;
  }

  function showQuestion(questionIndex) {
    console.log("showQuestion()");
    const currentQuestion = questions[questionIndex];
    // first hide the start section
    el.start.container.classList.add("hidden");
    // unhide the questions sections
    el.question.container.classList.remove("hidden");
    // set question text into question header
    el.question.header.textContent = currentQuestion.question;
    // loop through the answer button elements and update text for each one
    el.question.answerBtns.forEach((btn, index) => {
      btn.textContent = currentQuestion.answers[index];
    });
  }
})(); // IIFE
