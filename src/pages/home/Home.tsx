import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

type Player2 = "AI" | "PLAYER";

function Home() {
    const [player2, setSelected] = useState<Player2>();

    return (
        <div className="home">
            <div className="home__player2">
                <span className="emoji">😎</span>
                <h1>VS</h1>
                <div className="home__selector">
                    <button
                        type="button"
                        className="btn-transparent emoji"
                        onClick={() => setSelected("AI")}
                    >
                        🤖
                    </button>
                    <button
                        type="button"
                        className="btn-transparent emoji"
                        onClick={() => setSelected("PLAYER")}
                    >
                        😎
                    </button>
                </div>
            </div>

            <div className="home__play">
                <div
                    className={`emoji ${
                        player2 ? "back-forth-animation-left" : ""
                    }`}
                >
                    👉
                </div>
                <Link
                    to={player2 === "AI" ? "/pvai" : "/pvp"}
                    className={`btn-play`}
                >
                    PLAY
                </Link>
                <div
                    className={`emoji ${
                        player2 ? "back-forth-animation-right" : ""
                    }`}
                >
                    👈
                </div>
            </div>
        </div>
    );
}

export default Home;
