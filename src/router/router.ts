import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import Unit from "../pages/Unit";

export const route = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
    },
    { path: "/unit/:number", Component: Unit },
]);
