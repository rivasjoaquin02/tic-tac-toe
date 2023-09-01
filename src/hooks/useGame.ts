import { useEffect, useReducer } from "react";
import { whoWon } from "../utils/game";
import {
    AI,
    Board,
    FIRST_PLAYER,
    PLAYER,
    Players,
    SECOND_PLAYER,
    Winner,
} from "../constants";

type State = {
    board: Board;
    winner: Winner;
    currentPlayer: Players;
};

const ACTIONS = {
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
                currentPlayer: state.currentPlayer === AI ? PLAYER : AI,
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
    currentPlayer: FIRST_PLAYER,
};

const init = (): State => {
    // this generate a random number (0 -> 8)
    const firstPlay = Math.floor((Math.random() * 10) % 9);

    const board: Board = ["", "", "", "", "", "", "", "", ""];
    board[firstPlay] = FIRST_PLAYER;

    return {
        board,
        winner: undefined,
        currentPlayer: SECOND_PLAYER,
    };
};

export function useGame() {
    const [{ board, currentPlayer, winner }, dispatch] = useReducer(
        reducer,
        INITIAL,
        init
    );

    const handleMove = (idx: number) => {
        if (board[idx] !== "") return;

        const newBoard = [...board];
        newBoard[idx] = currentPlayer;

        dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });
    };

    const handleReset = () => dispatch({ type: ACTIONS.RESET });

    useEffect(() => {
        const winner = whoWon(board);
        if (winner) dispatch({ type: ACTIONS.SET_WINNER, payload: winner });
    }, [board]);

    return { board, winner, currentPlayer, handleMove, handleReset };
}
