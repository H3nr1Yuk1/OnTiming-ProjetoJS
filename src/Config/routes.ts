import { Router } from "express";
import { TarefaController } from "../Controller/tarefa.controller";

const router : Router = Router();

router.post("/tarefas/criar", new TarefaController().criar);
router.get("/tarefas/procurar", new TarefaController().procurar);

export { router }