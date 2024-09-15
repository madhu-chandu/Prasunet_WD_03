
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const gameModeRadios = document.querySelectorAll('input[name="game-mode"]');
let currentPlayer = 'X';  // Player starts
let gameActive = true;
let gameMode = 'player'; // Default to player vs player
const gameState = Array(9).fill(null);

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (gameState[index] || !gameActive || (currentPlayer === 'O' && gameMode === 'ai')) return;

    makeMove(index);
    if (!gameActive) return;

    if (gameMode === 'player') {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else {
        currentPlayer = 'O';  // AI's turn
        setTimeout(aiMove, 500);  // AI move after delay
    }
}

function makeMove(index) {
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer} Wins!`);
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        alert('It\'s a Draw!');
        gameActive = false;
    }
}

function aiMove() {
    let availableIndices = gameState
        .map((cell, index) => cell === null ? index : null)
        .filter(index => index !== null);

    if (availableIndices.length === 0) return;

    // Simple AI: Randomly select an available cell
    let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    makeMove(randomIndex);

    if (gameState.every(cell => cell)) {
        alert('It\'s a Draw!');
        gameActive = false;
        return;
    }

    currentPlayer = 'X';  // Switch back to player
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

function handleGameModeChange() {
    gameMode = document.querySelector('input[name="game-mode"]:checked').value;
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
gameModeRadios.forEach(radio => radio.addEventListener('change', handleGameModeChange));

resetGame(); // Initialize game state
