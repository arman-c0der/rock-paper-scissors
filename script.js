const choices = document.querySelectorAll('.choice-btn');
const resultText = document.getElementById('result');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return {
      result: 'draw',
      message: " It's a draw!"
    };
  }

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return {
      result: 'win',
      message: `You win! ${capitalize(playerChoice)} beats ${computerChoice}`
    };
  } else {
    return {
      result: 'lose',
      message: `You lose! ${capitalize(computerChoice)} beats ${playerChoice}`
    };
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

choices.forEach(button => {
  button.addEventListener('click', () => {
    if (gameOver) return;

    // Remove previous styles
    clearBorders();

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const round = playRound(playerChoice, computerChoice);

    highlightChoices(playerChoice, computerChoice, round.result);
    updateResult(round.message);
    updateScore(round.result);
    checkGameOver();
  });
});

function updateResult(message) {
  resultText.textContent = message;
} 

function updateScore(result) {
  if (result === 'win') {
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
}

function highlightChoices(player, computer, result) {
  const playerBtn = document.querySelector(`.choice-btn[data-choice="${player}"]`);
  const computerBtn = document.querySelector(`.choice-btn[data-choice="${computer}"]`);

  if (result === 'draw') {
    playerBtn.classList.add('draw');
    computerBtn.classList.add('draw');
  } else if (result === 'win') {
    playerBtn.classList.add('winner');
    computerBtn.classList.add('loser');
  } else {
    playerBtn.classList.add('loser');
    computerBtn.classList.add('winner');
  }
}

function clearBorders() {
  choices.forEach(btn => {
    btn.classList.remove('winner', 'loser', 'draw');
  });
}

function checkGameOver() {
  if (playerScore === 5 || computerScore === 5) {
    gameOver = true;
    if (playerScore === 5) {
      resultText.textContent = '🎉 Game Over! You win the game!';
    } else {
      resultText.textContent = '💻 Game Over! Computer wins the game!';
    }
  }
}

// Reset everything
resetBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultText.textContent = '';
  clearBorders();
});
