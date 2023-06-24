import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Lembrete from "./layouts/lembrete";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
    children: [
        {
          path: "./lembrete",
          element: <Lembrete />,
        },
        {
         /* path: "/tarefa",
          element: <Tarefa />,*/
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