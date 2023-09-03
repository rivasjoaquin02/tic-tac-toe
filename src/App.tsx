import { useNavigate } from "react-router-dom";
import Board from "./components/board/Board";
import { useGame } from "./hooks/GameProvider";

function App() {
    const { board, winner, handleMove, handleReset } = useGame();
    const navigate = useNavigate();

    return (
        <div className="app">
            <button type="button" onClick={() => navigate(-1)}>
                👈
            </button>

            <Board board={board} onMove={handleMove} winner={winner} />

            {winner && (
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            )}
        </div>
    );
}

export default App;
