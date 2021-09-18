# JS Code Quiz

A small multiple choice quiz to test your javascript knowledge.

<hr>
### Logic Breakdown

- [ ] Main page
- [ ] Highscore page

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
- [ ] WHEN user clicks answer
      <br/>
  - [ ] IF wrong
    - [ ] Reduce timer
          <br/>
  - [ ] IF correct
    - [ ] Increase score
          <br/>
  - [ ] IF last question
    - [ ] End game
          <br/>
  - [ ] ELSE
    - [ ] Display next question, restart this branch loop  
           <br/>
- [x] WHEN timer reaches 0
  - [x] Stop timer
  - [x] End game
        <br/>
- [ ] WHEN game ended

  - [ ] Show game over elements
  - [ ] Collect user initials
        <br/>

- [ ] WHEN user submits initials
  - [ ] Load highscores from local storage
  - [ ] Append new score to those in local storage
  - [ ] Navigate to high scores page

#### View highscore page

- [ ] Load scores from localstorage
- [ ] Sort scores
- [ ] Display scores
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
