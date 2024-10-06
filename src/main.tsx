import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { route } from "./router/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={route} />
    </QueryClientProvider>
);
