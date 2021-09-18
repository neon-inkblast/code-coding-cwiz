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
    timer: document.getElementById("timer"),
    score: document.getElementById("score"),
  };

  // Game variable initial values
  let currentQuestion = 0;
  let score = 0;
  const timerInitialValue = 180;
  let timer = timerInitialValue;
  let timerHandle = null;

  // Event listeners
  el.start.button.addEventListener("click", onStartClick);
  el.question.answerBtns.forEach((btn, index) => {
    btn.addEventListener("click", checkAnswerFn(index));
  });

  function onStartClick() {
    console.log("start-btn clicked");
    startQuiz();
  }

  function startQuiz() {
    console.log("startQuiz()");
    initQuiz();
    startTimer();
    showQuestion();
  }

  function initQuiz() {
    console.log("initQuiz()");
    // set score and question index back to initial values
    score = 0;
    currentQuestion = 0;
    timer = timerInitialValue;
  }

  function showQuestion() {
    console.log("showQuestion()");
    const question = questions[currentQuestion];
    // first hide the start section
    el.start.container.classList.add("hidden");
    // unhide the questions sections
    el.question.container.classList.remove("hidden");
    // set question text into question header
    el.question.header.textContent = question.question;
    // loop through the answer button elements and update text for each one
    el.question.answerBtns.forEach((btn, index) => {
      btn.textContent = question.answers[index];
    });
  }

  function checkAnswerFn(index) {
    return function () {
      const feedbackEl = document.createElement("div");
      if (questions[currentQuestion].correct === index) {
        correctAnswer(feedbackEl);
      } else {
        incorrectAnswer(feedbackEl);
      }
      el.question.feedback.appendChild(feedbackEl);
      delayedRemoveFeedback(feedbackEl);
      nextQuestion();
    };
  }

  function nextQuestion() {
    currentQuestion++;
    showQuestion();
  }

  function updateTimerDisplay() {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    el.timer.textContent = `${min}m ${sec}s`;
  }

  function startTimer() {
    console.log("startTimer()");
    timerHandle = setInterval(onTimerTick, 1000);

    function onTimerTick() {
      console.log("onTimer()");
      updateTimerDisplay();

      if (timer <= 0) {
        endQuiz();
      } else {
        timer--;
      }
    }
  }

  function endQuiz() {
    console.log("endQuiz()");
    clearInterval(timerHandle);
  }
})(); // IIFE
