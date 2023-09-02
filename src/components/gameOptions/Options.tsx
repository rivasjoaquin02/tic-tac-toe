import { ReactNode } from "react";

import "./options.css";

function SelectPlayers() {
    return (
        <div className="select__players">
            <span className="emoji">😎</span>

            <h3>vs</h3>

            <select defaultValue="player">
                <option value="player">
                    <span className="emoji">😎</span>
                </option>
                <option value="ai">
                    <span className="emoji">🤖</span>
                </option>
            </select>
        </div>
    );
}

function SelectXO() {
    return (
        <div className="select__xo">
            <input type="button" name="x" id="" value={"✖️"} />
            <input type="button" name="o" id="" value={"⭕"} />
        </div>
    );
}

function OptionsRoot({ children }: { children: ReactNode }) {
    return <div className="options">{children}</div>;
}

export const Options = OptionsRoot as typeof OptionsRoot & {
    SelectPlayers: typeof SelectPlayers;
    SelectXO: typeof SelectXO;
};
Options.SelectPlayers = SelectPlayers;
Options.SelectXO = SelectXO;
