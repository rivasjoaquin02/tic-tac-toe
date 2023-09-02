import Board from "./components/board/Board";
import { useGame } from "./hooks/GameProvider";

function App() {
    const { board, winner, handleMove, handleReset } = useGame();

    return (
        <div className="app">
            <div>
                <h3>O: AI</h3>
                <h3>X: Player</h3>
            </div>

            <Board board={board} onMove={handleMove} winner={winner} />

            {winner && (
                <div>
                    <input type="reset" onClick={handleReset} />
                </div>
            )}
        </div>
    );
}

export default App;
