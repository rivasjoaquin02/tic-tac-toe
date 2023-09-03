import { useReducer, useState } from "react";
import { generateAiMove, whoWon } from "../utils/game";
import { AI, Board, FIRST_PLAYER, PLAYER, Winner } from "../constants";

type State = {
    board: Board;
    winner: Winner | undefined;
    opponent: { type: "AI" | "HUMAN"; xo: "X" | "O" };
};

const ACTIONS = {
    SET_PLAYERS: "SET_PLAYERS",
    SET_OPPONENT: "SET_OPPONENT",
    SET_BOARD: "SET_BOARD",
    SET_WINNER: "SET_WINNER",
    RESET: "RESET",
} as const;

type Action =
    | {
          type: typeof ACTIONS.SET_BOARD;
          payload: Board;
      }
    | {
          type: typeof ACTIONS.SET_WINNER;
          payload: Winner;
      }
    | {
          type: typeof ACTIONS.RESET;
      }
    | {
          type: typeof ACTIONS.SET_OPPONENT;
          payload: State["opponent"];
      };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ACTIONS.SET_BOARD:
            return {
                ...state,
                board: action.payload,
            };
        case ACTIONS.SET_WINNER:
            return {
                ...state,
                winner: action.payload,
            };
        case ACTIONS.SET_OPPONENT:
            return {
                ...state,
                opponent: action.payload,
            };
        case ACTIONS.RESET:
            return init();
    }
}

const INITIAL: State = {
    board: ["", "", "", "", "", "", "", "", ""],
    winner: undefined,
    opponent: { type: "AI", xo: "O" },
};

const init = (): State => {
    // this generate a random number (0 -> 8)
    const firstPlay = Math.floor((Math.random() * 10) % 9);

    const board: Board = ["", "", "", "", "", "", "", "", ""];
    board[firstPlay] = "O";

    return { ...INITIAL, board };
};

export function useGameHook() {
    const [{ board, winner, opponent }, dispatch] = useReducer(
        reducer,
        INITIAL,
        init
    );
    const [opponentTurn, setOpponentTurn] = useState(opponent.type !== "AI");

    const handlePlayerMove = (playerIdx: number) => {
        if (board[playerIdx] !== "") return;

        // turn of PLAYER
        const newBoard = [...board];

        if (opponent.type === "HUMAN") {
            if (opponentTurn) {
                newBoard[playerIdx] = opponent.xo;
                setOpponentTurn(!opponentTurn);
            } else {
                newBoard[playerIdx] = opponent.xo === "O" ? "X" : "O";
                setOpponentTurn(!opponentTurn);
            }
        } else {
            newBoard[playerIdx] = opponent.xo === "O" ? "X" : "O";
        }
        dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });

        // is he the winner??
        let winner = whoWon(newBoard);
        if (winner) {
            dispatch({ type: ACTIONS.SET_WINNER, payload: winner });
            return;
        }

        if (opponent.type === "AI") {
            // turn of AI
            const aiIdx = generateAiMove(newBoard);
            newBoard[aiIdx] = AI;
            dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });

            // is he the winner??
            winner = whoWon(newBoard);
            if (winner) {
                dispatch({ type: ACTIONS.SET_WINNER, payload: winner });
                return;
            }
        }
    };

    const handleSetOpponentType = (type: State["opponent"]["type"]) => {
        dispatch({
            type: ACTIONS.SET_OPPONENT,
            payload: { ...opponent, type },
        });
    };

    const handleSetOpponentXO = (xo: State["opponent"]["xo"]) => {
        dispatch({
            type: ACTIONS.SET_OPPONENT,
            payload: { ...opponent, xo },
        });
    };

    const handleReset = () => dispatch({ type: ACTIONS.RESET });

    return {
        board,
        winner,
        opponent,
        handleMove: handlePlayerMove,
        handleOpponentType: handleSetOpponentType,
        handleOpponentXO: handleSetOpponentXO,
        handleReset,
    };
}
