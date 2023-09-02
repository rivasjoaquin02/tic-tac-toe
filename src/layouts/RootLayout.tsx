import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <div className="root-layout">
            <h1>Tic Tac Toe</h1>
            <Outlet />
        </div>
    );
}

export default RootLayout;
