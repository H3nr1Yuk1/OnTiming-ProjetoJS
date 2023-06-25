import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Lembrete from "./pages/lembrete";
import Tarefa from "./pages/tarefa";
import Home from "./layouts/home";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
    children: [
        {
          path: "/",
          element: <Home />,
        },{
          path: "/lembrete",
          element: <Lembrete />,
        },
        {
         path: "/tarefa",
          element: <Tarefa />,
        },
      ],
    },
  ],
);
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>
);