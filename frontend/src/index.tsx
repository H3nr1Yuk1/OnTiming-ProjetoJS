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
import CategoriaAcesso from "./pages/categoriaAcesso"
import CadastroCategoria from "./pages/cadastrarCategoria";
import RotinaCriar from "./pages/rotinaCriar";

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
        },{
          path: "/rotinas/criar",
          element: <RotinaCriar />
        },{
          path: "categorias/acesso/:id",
          element: <CategoriaAcesso />
        },{
          path: "categorias/criar",
          element: <CadastroCategoria />
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