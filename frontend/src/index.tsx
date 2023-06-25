import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Lembrete from "./pages/lembrete";
import Tarefa from "./pages/tarefa";
import Home from "./layouts/home";
import Rotina from "./pages/rotina";
import Categoria from "./pages/categoria";
import RotinaAcesso from "./pages/rotinaAcesso";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
        {
          path: "/",
          element: <Home />,
        },{
          path: "/rotinas",
          element: <Rotina />
        },{
          path: "/tarefas",
          element: <Tarefa />,
        },{
          path: "/categorias",
          element: <Categoria />,
        },{
          path: "/lembretes_padrao",
          element: <Lembrete />,
        },{
          path: "/rotinas/acesso/:id",
          element: <RotinaAcesso />
        }
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