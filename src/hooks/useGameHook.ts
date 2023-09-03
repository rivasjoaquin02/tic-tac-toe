import { useReducer, useState } from "react";
import { generateAiMove, whoWon } from "../utils/game";
import { Board, Winner } from "../constants";

type OpponentType = "AI" | "HUMAN";

type State =
    | {
          board: Board;
          winner: Winner | undefined;
      } & (
          | {
                player: { xo: "X" };
                opponent: { type: OpponentType; xo: "O" };
            }
          | {
                player: { xo: "O" };
                opponent: { type: OpponentType; xo: "X" };
            }
      );

const ACTIONS = {
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
                player: { xo: action.payload.xo === "X" ? "O" : "X" },
            };
        case ACTIONS.RESET:
            return init();
    }
}

const INITIAL: State = {
    board: ["", "", "", "", "", "", "", "", ""],
    winner: undefined,
    player: { xo: "X" },
    opponent: { type: "AI", xo: "O" },
};

const init = (): State => {
    // this generate a random number (0 -> 8)
    const firstPlay = Math.floor((Math.random() * 10) % 9);

    const boardWithInitialPlay: Board = ["", "", "", "", "", "", "", "", ""];
    boardWithInitialPlay[firstPlay] = "O";

    return { ...INITIAL, board: boardWithInitialPlay };
};

export function useGameHook() {
    const [{ board, winner, player, opponent }, dispatch] = useReducer(
        reducer,
        INITIAL,
        init
    );
    const [opponentTurn, setOpponentTurn] = useState(opponent.type !== "AI");

    const handlePlayerMove = (playerIdx: number) => {
        if (board[playerIdx] !== "" || winner) return;

        // Update the Board
        const newBoard = [...board];
        newBoard[playerIdx] = opponentTurn ? opponent.xo : player.xo;
        if (opponent.type === "HUMAN") setOpponentTurn(!opponentTurn);
        dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });

        // check for the winner
        const playerWinner = whoWon(newBoard);
        if (playerWinner)
            dispatch({ type: ACTIONS.SET_WINNER, payload: playerWinner });

        if (opponent.type === "AI" && !playerWinner) {
            // turn of AI
            const aiIdx = generateAiMove(newBoard);
            newBoard[aiIdx] = opponent.xo;
            dispatch({ type: ACTIONS.SET_BOARD, payload: newBoard });

            // check for the winner
            const opponentWinner = whoWon(newBoard);
            if (opponentWinner)
                dispatch({ type: ACTIONS.SET_WINNER, payload: opponentWinner });
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
        handlePlayerMove,
        handleSetOpponentType,
        handleSetOpponentXO,
        handleReset,
    };
}
