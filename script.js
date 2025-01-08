const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || checkWin()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusDisplay.textContent = 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(combination =>
        combination.every(index => gameState[index] === currentPlayer)
    );
}

function resetGame() {
    currentPlayer = 'X';
    gameState.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetGame();
