import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/water.css";
import "./styles/index.css";

import { RouterProvider } from "react-router-dom";
import AppRouter from "./routers/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={AppRouter} />
    </React.StrictMode>
);
