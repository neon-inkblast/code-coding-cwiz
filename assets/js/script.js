//Immediately invoked function expression (IIFE) pattern keeps our globals
// scoped to the function expression wrapper, off the real global.
(function () {
  // DOM elements, kept as an object for easy tracking in the IDE
  const el = {
    // start screen
    start: {
      container: document.querySelector(".start"),
      button: document.querySelector(".start-btn"),
    },
    // active quiz question screen
    question: {
      container: document.querySelector(".questions"),
      header: document.querySelector("#question-header"),
      answerBtns: document.querySelectorAll(".answer-btn"),
      feedback: document.querySelector(".feedback"),
    },
    // end game screen
    results: {
      container: document.querySelector(".results"),
      input: document.querySelector("#initials-input"),
      validation: document.getElementById("validation"),
      submitButton: document.querySelector("#submit"),
      tryAgainButton: document.querySelector("#try-again"),
    },
    // game stats
    timer: document.getElementById("timer-span"),
    score: document.getElementById("score-span"),
  };

  // Game variables constants
  // how much to add to score on correct
  const scoreIncrement = 10;
  // how much to substract from timer on incorrect
  const timerIncrement = 10;
  // how many seconds to start the quiz with
  const timerInitialValue = 180;
  // keep the storage key as a variable to reduce typos and make easier to update
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
  // end game high score submit button
  el.results.submitButton.addEventListener("click", onScoreSubmit);
  // end game try again button - reuse start game click handler
  el.results.tryAgainButton.addEventListener("click", onStartClick);

  //--------------------------Click handlers-------------------------//

  function onStartClick(event) {
    event.preventDefault();
    startQuiz();
  }

  function checkAnswerFn(index) {
    // create and return a function to be run by the click handler on an element
    // this way we can generate a new function for each handler based on the index passed into this function
    return function () {
      // create a new element for answer feedback "correct" or "incorrect"
      // create a new element for answer feedback "correct" or "incorrect"
      const feedbackEl = document.createElement("div");
      // if answer correct, do correct answer logic
      if (questions[currentQuestion].correct === index) {
        correctAnswer(feedbackEl);
      } else {
        // if answer not correct, do incorrect answer logic
        incorrectAnswer(feedbackEl);
      }
      // append the feedback text into the feedback container element
      el.question.feedback.appendChild(feedbackEl);
      // set up a timer to remove the newly created feedback text after a short delay
      delayedRemoveFeedback(feedbackEl);
      // move on to the next question
      nextQuestion();
    };
  }

  function onScoreSubmit(event) {
    event.preventDefault();
    // load high scores from storage, or set to an empty array if null
    const highScoreList = loadScores() || [];
    // get value from input form
    const initials = el.results.input.value;
    // if the value is falsy (null, "", etc), display validation message
    if (!initials) {
      el.results.validation.textContent = "You must enter a value";
      // otherwise
    } else {
      // clear validation message
      el.results.validation.textContent = "";
      // disable submit button so that it can't be entered multiple times
      el.results.submitButton.disabled = true;
      // create a new highscore object
      const highScore = {
        initials: initials.toUpperCase(),
        score,
      };
      // add it to the existing list
      highScoreList.push(highScore);
      // sort the list using Array.sort()
      highScoreList.sort((a, b) => {
        // by score first
        const result = b.score - a.score;
        // then if score is the same
        if (result === 0) {
          // sort by initials
          return a.initials.localeCompare(b.initials);
        }
        return result;
      });
      // save score list into local storage
      saveScores(highScoreList);
      // update the score list view on the results screen
      updateHighScores(highScoreList);
      // navigate to the seperate high scores page after 2 seconds
      setTimeout(navigateToHighScores, 2000);
    }
  }

  //--------------------------Game logic-------------------------//
  function startQuiz() {
    initQuiz();
    startTimer();
    showQuestion();
  }

  function initQuiz() {
    // set score, timer and question index back to initial values
    score = 0;
    currentQuestion = 0;
    timer = timerInitialValue;
    // re-enable the submit button and clear previous entry
    el.results.submitButton.disabled = false;
    el.results.input.value = "";
    // update the view
    updateScoreDisplay();
    updateTimerDisplay();
  }

  function showQuestion() {
    const question = questions[currentQuestion];
    // first hide the start section
    el.start.container.classList.add("hidden");
    el.results.container.classList.add("hidden");
    // unhide the questions sections
    el.question.container.classList.remove("hidden");
    // set question text into question header
    el.question.header.innerHTML = question.question;
    // loop through the answer button elements and update text for each one
    el.question.answerBtns.forEach((btn, index) => {
      btn.textContent = question.answers[index];
    });
  }

  function startTimer() {
    // set the interval handle into holding variable
    timerHandle = setInterval(onTimerTick, 1000);

    function onTimerTick() {
      // update timer view
      updateTimerDisplay();
      // if timer has run out, do end quiz
      if (timer <= 0) {
        endQuiz();
      } else {
        timer--;
      }
    }
  }

  function endQuiz() {
    // clear out the timer
    clearInterval(timerHandle);
    // hide questions
    el.question.container.classList.add("hidden");
    // show score entry form
    el.results.container.classList.remove("hidden");
  }

  function correctAnswer(element) {
    // add to score
    score += scoreIncrement;
    // update score view
    updateScoreDisplay();
    // fill in details of feedback element
    element.classList.add("correct");
    element.textContent = "Correct!";
  }

  function incorrectAnswer(element) {
    // decrease time remaining
    timer -= timerIncrement;
    // update time view
    updateTimerDisplay();
    // fill in details of feedback element
    element.classList.add("incorrect");
    element.textContent = "Wrong!";
  }

  function delayedRemoveFeedback(element) {
    // after 2 seconds, remove feedback displayed for previous answer
    setTimeout(function () {
      element.remove();
    }, 2000);
  }

  function nextQuestion() {
    // increase question index counter by 1
    currentQuestion++;
    // check if index is more than number of questions
    if (currentQuestion >= questions.length) {
      // if so, go to end quiz
      endQuiz();
    } else {
      // if not, show the next question
      showQuestion();
    }
  }

  //--------------------------View update logic-------------------------//
  function updateTimerDisplay() {
    // update the time remaining displayed on screen
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    el.timer.textContent = `${min}m ${sec}s`;
  }

  function updateScoreDisplay() {
    // update the score displayed on screen
    el.score.textContent = `${score} points`;
  }

  function updateHighScores(scores) {
    const scoreList = document.getElementById("scores-list");
    // empty the existing list element of all content
    scoreList.textContent = "";
    // generate a list item for each score and append it to the score list
    scores.forEach((score) => {
      const newItem = document.createElement("li");
      newItem.textContent = `${score.initials} - ${score.score}`;
      scoreList.appendChild(newItem);
    });
  }

  //--------------------------LocalStorage abstraction functions-------------------------//
  function loadScores() {
    // use JSON parse to convert localstorage value from string to array
    return JSON.parse(localStorage.getItem(storageKey));
  }

  function saveScores(scores) {
    // use JSON stringify to convert score array to a string for storing in localstorage
    localStorage.setItem(storageKey, JSON.stringify(scores));
  }

  //--------------------------Navigation functions-------------------------//
  function navigateToHighScores() {
    window.location.href = "./highscores.html";
  }
})(); // IIFE
