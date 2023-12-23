document.addEventListener('DOMContentLoaded', () => {
  const cells = document.getElementsByClassName('cell');
  const status = document.getElementById('status');
  const player1Score = document.getElementById('player1');
  const player2Score = document.getElementById('player2');
  const restartBtn = document.getElementById('restartBtn');
  const toggleBtn = document.getElementById('toggleBtn'); 

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];

  let score1 = 0;
  let score2 = 0;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for win/tie, update scores
  for (const cell of cells) {
    cell.addEventListener('click', () => {
      if (status.textContent.includes('Wins') || status.textContent === "It's a Tie!") {
        return;
      }

      const index = Array.from(cells).indexOf(cell);
      makeMove(index);
    });
  }

  function makeMove(index) {
    if (gameState[index] !== '') {
      return;
    }

    gameState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].classList.add(currentPlayer);
    if (checkWin(currentPlayer)) {
      status.textContent = `Player ${currentPlayer} Wins!`;
      updateScore();
      restartBtn.style.display = 'block'; 
      console.log('Game Over - Player Wins');
    } else if (isBoardFull()) {
      status.textContent = "It's a Tie!";
      restartBtn.style.display = 'block'; 
      console.log('Game Over - Tie');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s Turn`;
      restartBtn.style.display = 'none'; 
      console.log('Next Player:', currentPlayer);
    }
  }

  function checkWin(player) {
    for (const combination of winningCombinations) {
      let count = 0;
      for (const index of combination) {
        if (gameState[index] === player) {
          count++;
        }
      }
      if (count === 3) {
        highlightWinningCells(combination);
        return true;
      }
    }
    return false;
  }

  function highlightWinningCells(combination) {
    for (const index of combination) {
      cells[index].classList.add('win');
    }
  }

  function updateScore() {
    if (currentPlayer === 'X') {
      score1++;
      player1Score.innerText = `Player X: ${score1}`;
    } else {
      score2++;
      player2Score.innerText = `Player O: ${score2}`;
    }
  }

  function isBoardFull() {
    return gameState.every(cell => cell !== '');
  }

  function restart() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.innerText = `Player ${currentPlayer} Turn`;
    restartBtn.style.display = 'none'; // Hide the restartBtn
    clearBoard();
  }

  function clearBoard() {
    for (const cell of cells) {
      cell.innerText = '';
      cell.classList.remove('X', 'O', 'win');
    }
  }

  restartBtn.addEventListener('click', restart);

  // Toggle between light and dark mode
  toggleBtn.addEventListener('click', function() {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Toggle the dark-mode class on the body
  });
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
});
