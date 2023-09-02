import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <div className="root-layout">
            <Outlet />
        </div>
    );
}

export default RootLayout;
