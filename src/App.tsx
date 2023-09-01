import Board from "./board/Board";
import { useGame } from "./hooks/useGame";

function App() {
    const { board, winner, handleMove, handleReset } = useGame();

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <div>
                <h3>O: AI</h3>
                <h3>X: Player</h3>
            </div>

            <Board board={board} onMove={handleMove} winner={winner} />

            {winner && (
                <div>
                    <button type="button" onClick={handleReset}>
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
