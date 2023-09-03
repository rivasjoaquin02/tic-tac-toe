import { Winner, type Board, DRAW } from "../../constants";
import { useGame } from "../../store/store";
import "./board.css";

const getColorBox = (winner: Winner | undefined, idx: number): string => {
    if (winner && winner !== DRAW) {
        const { a, b, c } = winner.pos;
        if (a === idx || b === idx || c === idx) return "red";
    }
    return "white";
};

function Board() {
    const board = useGame((state) => state.board);
    const winner = useGame((state) => state.winner);
    const handlePlayerMove = useGame((state) => state.handlePlayerMove);

    return (
        <div className="board">
            {board.map((box, idx) => (
                <button
                    type="button"
                    key={idx}
                    onClick={() => handlePlayerMove(idx)}
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
