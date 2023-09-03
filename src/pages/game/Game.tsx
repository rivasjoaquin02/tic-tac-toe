import { useNavigate } from "react-router-dom";
import Board from "../../components/board/Board";
import { useGame } from "../../store/store";

function Game() {
    const handleReset = useGame((state) => state.handleReset);
    const winner = useGame((state) => state.winner);

    const navigate = useNavigate();

    return (
        <div className="app">
            <button type="button" onClick={() => navigate(-1)}>
                👈
            </button>

            <Board />

            {winner && (
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            )}
        </div>
    );
}

export default Game;
