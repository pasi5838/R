
function showConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}



let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let score = { X: 0, O: 0 };

function createBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.innerText = cell;
        div.onclick = handleClick;
        gameBoard.appendChild(div);
    });
}

function handleClick() {
    const index = this.dataset.index;
    if (board[index] !== "") return;
    board[index] = currentPlayer;
    createBoard();
    if (checkWinner()) {
        alert("Pemain " + currentPlayer + " menang!");
        score[currentPlayer]++;
        updateScore();
        confetti();
        board = ["", "", "", "", "", "", "", "", ""];
    } else if (!board.includes("")) {
        alert("Seri!");
        board = ["", "", "", "", "", "", "", "", ""];
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    createBoard();
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(i => board[i] === currentPlayer);
    });
}

function updateScore() {
    document.getElementById("scoreX").innerText = score.X;
    document.getElementById("scoreO").innerText = score.O;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    createBoard();
}

function resetScores() {
    score = { X: 0, O: 0 };
    updateScore();
}

window.onload = () => {
    createBoard();
    updateScore();
};
