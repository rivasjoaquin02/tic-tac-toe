import { useState } from "react";
import "./home.css";
import { Options } from "../../components/gameOptions/Options";
import { useNavigate } from "react-router-dom";

function Home() {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="home">
            <button
                type="button"
                className="btn-home"
                onClick={() => navigate("/play")}
            >
                <span>🕹️</span>
                Play
            </button>
            <button
                type="button"
                className="btn-home"
                onClick={() => setShowOptions(!showOptions)}
            >
                <span>⚙️</span>
                Options
            </button>
            <button
                type="button"
                className="btn-home"
                onClick={() => navigate("/score")}
            >
                <span>💯</span>
                Score
            </button>

            {showOptions && (
                <Options>
                    <Options.SelectPlayers />
                    <Options.SelectXO />
                </Options>
            )}
        </div>
    );
}

export default Home;
