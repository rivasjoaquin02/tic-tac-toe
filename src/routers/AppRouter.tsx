import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import App from "../App";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="pvp" element={<App />} />
            <Route path="pvai" element={<App />} />
        </Route>
    )
);

export default router;
