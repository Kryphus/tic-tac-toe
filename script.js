
const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const updateBoard = (index, marker) => {
        if (board[index] === "") board[index] = marker;
    }
    const resetBoard = () => board.fill("");
    return { getBoard, updateBoard, resetBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}

const gameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;

    const addPlayers = (player1, player2) => {
        players = [player1, player2];
    }

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchTurn = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const checkWinner = () => {
        const board = gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }


        if (!board.includes("")) {
            return "tie";
        }
        return null;

    };

    return { addPlayers, getCurrentPlayer, switchTurn, checkWinner }


})();

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const renderBoard = () => {
        const board = gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    const handleCellClick = (e) => {
        const cellIndex = e.target.id - 1;
        const currentPlayer = gameController.getCurrentPlayer();

        if (gameboard.getBoard()[cellIndex] !== "") return;

        gameboard.updateBoard(cellIndex, currentPlayer.marker);
        renderBoard();

        const winner = gameController.checkWinner();
        if (winner) {
            setTimeout(() => {
                if (winner === "tie") {
                    alert("It's a tie!");
                } else {
                    alert(`${currentPlayer.name} wins!`);
                }
                gameboard.resetBoard();
                renderBoard();
            }, 100)
        } else {
            gameController.switchTurn();
        }
    };

    const initialize = () => {
        cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
        renderBoard();
    };

    return { initialize };
})();


const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
gameController.addPlayers(player1, player2);
displayController.initialize();