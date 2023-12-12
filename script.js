var userScore = 0;
var compScore = 0;
let msg = document.querySelector("#msg");
let choiceMessage = document.querySelector(".choice-message");
let resultMessage = {
  "draw": {
    message: "Game was draw. Play again", bgColor: "#030d18"
  },
  "userLose": {
    message: "You lost! 😢", bgColor: "red", updateScore: function () { compScore++; }
  },
  "userWin": {
    message: "You won! 😎", bgColor: "green", updateScore: function () { userScore++; }
  }
}

const choices = document.querySelectorAll('.choice');
const genCompChoice = () => {
  const options = ['rock', 'paper', 'scissors'];
  let randNum = Math.floor(Math.random() * 3);
  return options[randNum];
}
const changeScore = (result) => {
  resultMessage[result].updateScore();
  document.querySelector('#user-score').innerText = userScore;
  document.querySelector("#comp-score").innerText = compScore;
}
const showWinner = (result) => {
  if (result !== "draw") {
    changeScore(result);
  }
  msg.innerText = resultMessage[result].message;
  msg.style.backgroundColor = resultMessage[result].bgColor;
}
const checkWinner = (user, comp) => {
  if (user === comp) {
    return "draw";
  }
  let userWin = true;
  if (user === 'rock') {
    //computer choices: paper, scissors
    userWin = (comp === "paper" ? false : true);
  } else if (user == "paper") {
    //computer choices: rock, scissors
    userWin = (comp === "scissors" ? false : true);
  } else {
    //computer choices: rock, paper
    userWin = (comp === 'rock' ? false : true);
  }
  return (userWin ? "userWin" : "userLose");
}

const playGame = (uChoice) => {
  let compChoice = genCompChoice();
  let result = checkWinner(uChoice, compChoice);
  showWinner(result);
  choiceMessage.style.display = "inline-block";
  choiceMessage.innerHTML = `you chose: ${uChoice}<br>
  computer chose: ${compChoice}`;
}
choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const userChoice = choice.getAttribute('id');
    playGame(userChoice);
  });
});