
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

    const switchturn = () => {
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

        return board.includes("") ? null : "tie";
    };

    return { addPlayers, getCurrentPlayer, switchturn, checkWinner }


})();

gameboard.updateBoard(0, "X");
gameboard.updateBoard(1, "X");
gameboard.updateBoard(2, "X");

const result = gameController.checkWinner();
console.log(result);