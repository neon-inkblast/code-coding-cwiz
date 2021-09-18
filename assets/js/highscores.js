(function () {
  const storageKey = "highscores";
  const highScores = JSON.parse(localStorage.getItem(storageKey));
  const scoreList = document.getElementById("scores-list");
  scoreList.textContent = "";
  highScores.forEach((score, index) => {
    const newItem = document.createElement("li");
    newItem.textContent = `${score.score} - ${score.initials}`;
    scoreList.appendChild(newItem);
  });
})();
