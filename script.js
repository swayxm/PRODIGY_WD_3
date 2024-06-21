const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let scores = { X: 0, O: 0 };

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

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = `Player ${currentPlayer} Wins!`;
        scores[currentPlayer]++;
        updateScores();
        isGameActive = false;
        winSound.play();
        return;
    }

    if (!board.includes('')) {
        message.innerHTML = `It's a Draw!`;
        isGameActive = false;
        drawSound.play();
        return;
    }
};

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickSound.play();

    handleResultValidation();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleResetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.innerHTML = '';
    cells.forEach(cell => cell.innerHTML = '');
};

const updateScores = () => {
    playerXScore.innerHTML = `Player X: ${scores.X}`;
    playerOScore.innerHTML = `Player O: ${scores.O}`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleResetGame);
