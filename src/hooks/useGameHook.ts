import { useReducer } from "react";
import { generateAiMove, whoWon } from "../utils/game";
import { AI, Board, FIRST_PLAYER, PLAYER, Winner } from "../constants";

type State = {
    board: Board;
    winner: Winner | undefined;
};

const ACTIONS = {
    SET_PLAYERS: "SET_PLAYERS",
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
        case ACTIONS.RESET:
            return init();
    }
}

const INITIAL = {
    board: ["", "", "", "", "", "", "", "", ""],
    winner: undefined,
    players: undefined,
};

const init = (): State => {
    // this generate a random number (0 -> 8)
    const firstPlay = Math.floor((Math.random() * 10) % 9);

    const board: Board = ["", "", "", "", "", "", "", "", ""];
    board[firstPlay] = FIRST_PLAYER;

    return {
        board,
        winner: undefined,
        players: undefined,
    };
};

export function useGameHook() {
    const [{ board, winner }, dispatch] = useReducer(reducer, INITIAL, init);

    const handlePlayerMove = (playerIdx: number) => {
        if (board[playerIdx] !== "") return;

        // turn of PLAYER
        const newBoard = [...board];
        newBoard[playerIdx] = PLAYER;
        dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });

        // is he the winner??
        let winner = whoWon(newBoard);
        if (winner) {
            dispatch({ type: ACTIONS.SET_WINNER, payload: winner });
            return;
        }

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
    };

    const handleReset = () => dispatch({ type: ACTIONS.RESET });

    return {
        board,
        winner,
        handleMove: handlePlayerMove,
        handleReset,
    };
}
