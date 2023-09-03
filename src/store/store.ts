import { create } from "zustand";
import { generateAiMove, whoWon } from "../utils/game";

type Board = Array<"O" | "X" | "">;
type Winner =
    | { winner: "X" | "O"; pos: { a: number; b: number; c: number } }
    | "DRAW";

type Player = {
    xo: "O" | "X";
};
type Opponent = {
    type: "HUMAN" | "AI";
    xo: "O" | "X";
};

export const useGame = create<{
    board: Board;
    winner: Winner | undefined;
    player: Player;
    opponent: Opponent;
    opponentTurn: boolean;
    setOpponentType: (type: Opponent["type"]) => void;
    setOpponentXO: (xo: Opponent["xo"]) => void;
    handleReset: () => void;
    handlePlayerMove: (playerIdx: number) => void;
}>((set, get) => ({
    board: ["", "", "", "", "", "", "", "", ""],
    winner: undefined,
    player: { xo: "X" },
    opponent: { type: "AI", xo: "O" },
    opponentTurn: false,
    setOpponentType: (type) => {
        set({
            opponent: { ...get().opponent, type },
        });
    },
    setOpponentXO: (xo) => {
        set({
            opponent: { ...get().opponent, xo },
        });
    },
    handleReset: () => {
        set({
            board: ["", "", "", "", "", "", "", "", ""],
            winner: undefined,
            opponentTurn: false,
        });
    },
    handlePlayerMove: (playerIdx) => {
        if (get().board[playerIdx] !== "" || get().winner) return;

        const newBoard = [...get().board];
        newBoard[playerIdx] = get().opponentTurn
            ? get().opponent.xo
            : get().player.xo;

        if (get().opponent.type === "HUMAN")
            set({ opponentTurn: !get().opponentTurn });
        set({ board: newBoard });

        const playerWinner = whoWon(newBoard);
        if (playerWinner) set({ winner: playerWinner });

        if (get().opponent.type === "AI" && !playerWinner) {
            const aiIdx = generateAiMove(newBoard);
            newBoard[aiIdx] = get().opponent.xo;
            set({ board: newBoard });

            const opponentWinner = whoWon(newBoard);
            if (opponentWinner) set({ winner: opponentWinner });
        }
    },
}));
