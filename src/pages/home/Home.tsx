import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Options } from "../../components/options/Options";

import "./home.css";

function Home() {
    const [showOptions, setShowOptions] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="home">
            <button
                type="button"
                className="btn-home"
                onClick={() => navigate("/play")}
            >
                <span className="icon">🕹️</span>
                Play
            </button>
            <button
                type="button"
                className="btn-home"
                onClick={() => setShowOptions(!showOptions)}
            >
                <span className="icon">⚙️</span>
                Options
            </button>
            <button
                type="button"
                className="btn-home"
                onClick={() => setShowScore(!showScore)}
            >
                <span className="icon">💯</span>
                Score
            </button>

            {showOptions && (
                <Options>
                    <Options.SelectOponent />
                    <Options.SelectXO />
                </Options>
            )}
        </div>
    );
}

export default Home;
