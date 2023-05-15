import { Router } from "express";
import { TarefaController } from "../Controller/tarefa.controller";
import { CategoriaContoller } from "../Controller/categoria.controller";
import { RotinaController } from "../Controller/rotina.controller";

const router : Router = Router();

router.post("/tarefas/criar", new TarefaController().criar);
router.get("/tarefas/remover/:id", new TarefaController().remover);
router.get("/tarefas/atualizar/:id", new TarefaController().atualizarTempo);
router.get("/tarefas/procurar/:id", new TarefaController().procurar);
router.get("/tarefas/listar", new TarefaController().listar);

router.post("/categorias/criar", new CategoriaContoller().criar);
router.get("/categorias/remover/:id", new CategoriaContoller().remover);
router.get("/categorias/atualizar/cor/:id", new CategoriaContoller().atualizarCor);
router.get("/categorias/procurar/:id", new CategoriaContoller().procurar);
router.get("/categorias/listar", new CategoriaContoller().listar);

router.post("/rotinas/criar", new RotinaController().criar);
router.get("/rotinas/remover/:id", new RotinaController().remover);
router.get("/rotinas/atualizar/:id", new RotinaController().atualizarTarefas);
router.get("/rotinas/procurar/:id", new RotinaController().procurar);
router.get("/rotinas/listar", new RotinaController().listar);

router.post("/lembretes/criar", new CategoriaContoller().criar);
router.get("/lembretes/remover/:id", new CategoriaContoller().remover);

export { router }