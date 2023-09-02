import { AI, Board, DRAW, PLAYER, Winner } from "../constants";

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

export function whoWon(board: Board): Winner | undefined {
    for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];

        if (board[a] === "" || board[b] === "" || board[c] === "") continue;

        if (board[a] === board[b] && board[a] === board[c]) {
            return board[a] === AI
                ? { winner: AI, pos: { a, b, c } }
                : { winner: PLAYER, pos: { a, b, c } };
        }
    }

    if (isGameOver(board)) return DRAW;
    return undefined;
}

function getEmptyCellsIndexes(board: Board): Array<number> {
    return board.reduce((emptyCells, cell, idx) => {
        if (cell === "") emptyCells.push(idx);
        return emptyCells;
    }, [] as Array<number>);
}

function cost(winner: Winner): -1 | 0 | 1 {
    if (winner === DRAW) return 0;
    if (winner.winner === AI) return 1;
    return -1;
}

function minimax(
    board: Board,
    maxTurn: boolean = false
): ReturnType<typeof cost> {
    const winner = whoWon(board);
    if (winner) return cost(winner);

    let bestVal: number;
    if (maxTurn) {
        bestVal = -Infinity;

        const emptyCells = getEmptyCellsIndexes(board);
        emptyCells.forEach((cellIdx) => {
            board[cellIdx] = AI;
            bestVal = Math.max(bestVal, minimax(board, !maxTurn));
            board[cellIdx] = "";
        });
    } else {
        bestVal = Infinity;

        const emptyCells = getEmptyCellsIndexes(board);
        emptyCells.forEach((cellIdx) => {
            board[cellIdx] = PLAYER;
            bestVal = Math.min(bestVal, minimax(board, !maxTurn));
            board[cellIdx] = "";
        });
    }

    return bestVal;
}

function alpha_beta(
    board: Board,
    alpha: number = -Infinity,
    beta: number = Infinity,
    maxTurn: boolean = false
): ReturnType<typeof cost> {
    const winner = whoWon(board);
    if (winner) return cost(winner);

    if (maxTurn) {
        alpha = -Infinity;

        const emptyCells = getEmptyCellsIndexes(board);
        for (const cellIdx of emptyCells) {
            board[cellIdx] = AI;
            alpha = Math.max(alpha, alpha_beta(board, alpha, beta, !maxTurn));
            board[cellIdx] = "";

            if (beta <= alpha) break;
        }
        return alpha;
    } else {
        beta = Infinity;

        const emptyCells = getEmptyCellsIndexes(board);
        for (const cellIdx of emptyCells) {
            board[cellIdx] = PLAYER;
            beta = Math.max(beta, alpha_beta(board, alpha, beta, !maxTurn));
            board[cellIdx] = "";

            if (beta <= alpha) break;
        }
        return beta;
    }
}

export function generateAiMove(board: Board): number {
    let maxScore = -Infinity;
    let pos = -1;

    const emptyCells = getEmptyCellsIndexes(board);
    for (const cellIdx of emptyCells) {
        board[cellIdx] = AI;
        const scoreInThatCell = minimax(board);
        board[cellIdx] = "";

        if (scoreInThatCell > maxScore) {
            maxScore = scoreInThatCell;
            pos = cellIdx;
        }
    }

    return pos;
}
