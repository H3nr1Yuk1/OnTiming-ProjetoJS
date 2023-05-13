import { Router } from "express";
import { TarefaController } from "../Controller/tarefa.controller";
import { CategoriaContoller } from "../Controller/categoria.controller";

const router : Router = Router();

router.post("/tarefas/criar", new TarefaController().criar);
router.get("/tarefas/remover/:id", new TarefaController().remover);
router.get("/tarefas/atualizar/:id", new TarefaController().atualizarTempo);
router.get("/tarefas/procurar/:id", new TarefaController().procurar);
router.get("/tarefas/listar", new TarefaController().listar);

router.post("/categorias/criar", new CategoriaContoller().criar);
router.get("/categorias/remover/:id", new CategoriaContoller().remover);
router.get("/categorias/atualizar/:id", new CategoriaContoller().atualizarCor);
router.get("/categorias/procurar/:id", new CategoriaContoller().procurar);
router.get("/categorias/listar", new CategoriaContoller().listar)

export { router }