import { Router } from "express";
import { TarefaController } from "../Controller/tarefa.controller";

const router : Router = Router();

router.post("/tarefas/criar", new TarefaController().criar);
router.get("/tarefas/remover/:id", new TarefaController().remover);
router.get("/tarefas/atualizar/:id", new TarefaController().atualizar);
router.get("/tarefas/procurar/:id", new TarefaController().procurar);
router.get("/tarefas/listar", new TarefaController().listar);

export { router }