import { ChangeEvent, ReactNode, useState } from "react";

import "./options.css";
import { O, X } from "../../constants";
import { useGame } from "../../store/store";

const AI = "AI";
const HUMAN = "HUMAN";

type Opponent = typeof AI | typeof HUMAN;

function SelectOponent() {
    const opponent = useGame((state) => state.opponent);
    const setOpponentType = useGame((state) => state.setOpponentType);

    const handleSelectOpponent = (e: ChangeEvent<HTMLSelectElement>) => {
        const opponentSelected = e.target.value as Opponent;
        setOpponentType(opponentSelected);
    };

    return (
        <div className="select-opponent">
            <span className="emoji">😎</span>

            <h3>vs</h3>

            <select
                defaultValue={opponent.type}
                onChange={handleSelectOpponent}
            >
                <option value={HUMAN} className="emoji">
                    😎
                </option>
                <option value={AI} className="emoji">
                    🤖
                </option>
            </select>
        </div>
    );
}

function SelectXO() {
    const opponent = useGame((state) => state.opponent);
    const setOpponentXO = useGame((state) => state.setOpponentXO);

    return (
        <div className="select__xo">
            <input
                type="button"
                name="x"
                id=""
                value={"✖️"}
                onClick={() => setOpponentXO(X)}
                disabled={opponent.xo === X}
            />
            <input
                type="button"
                name="o"
                id=""
                value={"⭕"}
                onClick={() => setOpponentXO(O)}
                disabled={opponent.xo === O}
            />
        </div>
    );
}

function OptionsRoot({ children }: { children: ReactNode }) {
    const [close, setClose] = useState(false);

    return (
        <div className="options" style={{ display: close ? "none" : "" }}>
            <button
                type="button"
                className="btn-close"
                onClick={() => setClose(true)}
            >
                x
            </button>
            {children}
        </div>
    );
}

export const Options = OptionsRoot as typeof OptionsRoot & {
    SelectOponent: typeof SelectOponent;
    SelectXO: typeof SelectXO;
};

Options.SelectOponent = SelectOponent;
Options.SelectXO = SelectXO;
