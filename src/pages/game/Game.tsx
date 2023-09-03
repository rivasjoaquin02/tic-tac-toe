import { useNavigate } from "react-router-dom";
import Board from "../../components/board/Board";
import { useGame } from "../../store/store";

import "./game.css";

function Game() {
    const handleReset = useGame((state) => state.handleReset);
    const navigate = useNavigate();

    return (
        <div className="game">
            <div className="game__menu">
                <button type="button" onClick={() => navigate(-1)}>
                    👈
                </button>

                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </div>

            <Board />
        </div>
    );
}

export default Game;
