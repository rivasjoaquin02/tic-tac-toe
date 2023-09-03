import { Winner, type Board, DRAW } from "../../constants";
import "./board.css";

type BoardProps = {
    board: Board;
    onMove: (idx: number) => void;
    winner?: Winner;
};

const getColorBox = (winner: Winner | undefined, idx: number): string => {
    if (winner && winner !== DRAW) {
        const { a, b, c } = winner.pos;
        if (a === idx || b === idx || c === idx) return "red";
    }
    return "white";
};

function Board({ board, onMove, winner }: BoardProps) {
    return (
        <div className="board">
            {board.map((box, idx) => (
                <button
                    type="button"
                    key={idx}
                    onClick={() => onMove(idx)}
                    className="box"
                    disabled={winner !== undefined}
                    style={{
                        color: getColorBox(winner, idx),
                    }}
                >
                    {box}
                </button>
            ))}
        </div>
    );
}

export default Board;
