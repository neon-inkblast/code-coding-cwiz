# JS Code Quiz

A small multiple choice quiz to test your javascript knowledge.

<hr>
### Logic Breakdown

- [x] Main page
- [x] Highscore page

#### Main page

- [x] Start button
      <br/>
- [x] WHEN user clicks start
  - [x] Set score/timer/question back to initial values
  - [x] Start timer
  - [x] Hide start button/welcome
  - [x] Display first question
        <br/>
- [x] When timer ticks
  - [x] update timer display
  - [x] check if timer is < 0
        <br/>
- [x] WHEN user clicks answer
      <br/>
  - [x] IF wrong
    - [x] Reduce timer
          <br/>
  - [x] IF correct
    - [x] Increase score
          <br/>
  - [x] IF last question
    - [x] End game
          <br/>
  - [x] ELSE
    - [x] Display next question, restart this branch loop  
           <br/>
- [x] WHEN timer reaches 0
  - [x] Stop timer
  - [x] End game
        <br/>
- [x] WHEN game ended

  - [x] Show game over elements
  - [x] Collect user initials
        <br/>

- [x] WHEN user submits initials
  - [x] Load highscores from local storage
  - [x] Append new score to those in local storage
  - [x] Navigate to high scores page

#### View highscore page

- [x] Load scores from localstorage
- [x] Sort scores
- [x] Display scores
<hr>

### Extension ideas

- [ ] Choose questions from a pool
- [ ] Randomised questions
- [ ] Randomised answer order
- [ ] Difficulty levels
- [ ] Score value per difficulty
- [ ] CSS animations
- [ ] Load questions from backend API
- [ ] Store scores in a backend database

Made with 🫀 by Ben
©️2021
