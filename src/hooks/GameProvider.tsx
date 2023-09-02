import { ReactNode, createContext, useContext } from "react";
import { useGameHook } from "./useGameHook";

const GameContext = createContext<ReturnType<typeof useGameHook>>(
    {} as unknown as ReturnType<typeof useGameHook>
);

export const useGame = () => {
    const ctx = useContext(GameContext);

    if (!ctx)
        throw new Error("Game Context can only be used inside GameProvider");

    return ctx;
};

export function GameProvider({ children }: { children: ReactNode }) {
    return (
        <GameContext.Provider value={useGameHook()}>
            {children}
        </GameContext.Provider>
    );
}
