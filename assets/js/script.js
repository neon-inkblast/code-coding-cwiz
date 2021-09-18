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
      header: document.querySelector("#question-header"),
      answerBtns: document.querySelectorAll(".answer-btn"),
      feedback: document.querySelector(".feedback"),
    },
    results: {
      container: document.querySelector(".results"),
      input: document.querySelector("#initials-input"),
      validation: document.getElementById("validation"),
      submitButton: document.querySelector("#submit"),
      tryAgainButton: document.querySelector("#try-again"),
    },
    timer: document.getElementById("timer"),
    score: document.getElementById("score"),
  };

  // Game variables constants
  const scoreIncrement = 10;
  const timerIncrement = 10;
  const timerInitialValue = 180;
  const storageKey = "highscores";
  // Game variables
  let currentQuestion = 0;
  let score = 0;
  let timer = timerInitialValue;
  let timerHandle = null;

  // Event listeners
  // start button
  el.start.button.addEventListener("click", onStartClick);
  // answer buttons
  el.question.answerBtns.forEach((btn, index) => {
    btn.addEventListener("click", checkAnswerFn(index));
  });
  // high score button
  el.results.submitButton.addEventListener("click", onScoreSubmit);
  el.results.tryAgainButton.addEventListener("click", onStartClick);

  function onStartClick(event) {
    event.preventDefault();
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

    el.results.submitButton.disabled = false;
    el.results.input.value = "";

    updateScoreDisplay();
    updateTimerDisplay();
  }

  function showQuestion() {
    console.log("showQuestion()");
    const question = questions[currentQuestion];
    // first hide the start section
    el.start.container.classList.add("hidden");
    el.results.container.classList.add("hidden");
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

  function correctAnswer(element) {
    score += scoreIncrement;
    updateScoreDisplay();
    element.classList.add("correct");
    element.textContent = "Correct!";
  }

  function incorrectAnswer(element) {
    timer -= timerIncrement;
    updateTimerDisplay();
    element.classList.add("incorrect");
    element.textContent = "Wrong!";
  }

  function delayedRemoveFeedback(element) {
    setTimeout(function () {
      element.remove();
    }, 2000);
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }

  function updateTimerDisplay() {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    el.timer.textContent = `${min}m ${sec}s`;
  }

  function updateScoreDisplay() {
    el.score.textContent = `${score} points`;
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
    el.question.container.classList.add("hidden");
    el.results.container.classList.remove("hidden");
  }

  function updateHighScores(scores) {
    const scoreList = document.getElementById("scores-list");
    scoreList.textContent = "";
    scores.forEach((score) => {
      const newItem = document.createElement("li");
      newItem.textContent = `${score.initials} - ${score.score}`;
      scoreList.appendChild(newItem);
    });
  }

  function onScoreSubmit(event) {
    event.preventDefault();
    console.log("onScoreSubmit()");
    const highScoreList = loadScores() || [];
    const initials = el.results.input.value;
    if (!initials) {
      el.results.validation.textContent = "You must enter a value";
    } else {
      el.results.validation.textContent = "";
      el.results.submitButton.disabled = true;
      const highScore = {
        initials: initials.toUpperCase(),
        score,
      };
      highScoreList.push(highScore);
      highScoreList.sort((a, b) => {
        const result = b.score - a.score;
        if (result === 0) {
          return a.initials.localeCompare(b.initials);
        }
        return result;
      });
      saveScores(highScoreList);
      updateHighScores(highScoreList);
    }
  }

  function loadScores() {
    return JSON.parse(localStorage.getItem(storageKey));
  }

  function saveScores(scores) {
    localStorage.setItem(storageKey, JSON.stringify(scores));
  }
})(); // IIFE
