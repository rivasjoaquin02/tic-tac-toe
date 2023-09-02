import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/water.css";
import "./styles/index.css";

import { RouterProvider } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import { GameProvider } from "./hooks/GameProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GameProvider>
            <RouterProvider router={AppRouter} />
        </GameProvider>
    </React.StrictMode>
);
