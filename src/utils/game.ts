import { AI, Board, PLAYER, Winner } from "../constants";

const wins = [
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
    [0, 3, 6],
    [2, 5, 8],
    [0, 1, 2],
    [6, 7, 8],
];

export function isGameOver(board: Board): boolean {
    return board.every((box) => box !== "");
}

export function whoWon(board: Board): Winner {
    for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];

        if (board[a] === "" || board[b] === "" || board[c] === "") continue;

        if (board[a] === board[b] && board[a] === board[c]) {
            return board[a] === AI
                ? { winner: AI, pos: { a, b, c } }
                : { winner: PLAYER, pos: { a, b, c } };
        }
    }

    if (isGameOver(board)) return "DRAW";
}
