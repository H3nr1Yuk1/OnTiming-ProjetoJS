import { Router } from "express";
import { TarefaController } from "../Controller/tarefa.controller";
import { CategoriaContoller } from "../Controller/categoria.controller";
import { RotinaController } from "../Controller/rotina.controller";
import { LembreteController } from "../Controller/lembrete.controller";
import { LembretePadraoController } from "../Controller/lembrete_padrao.controller";

const router : Router = Router();

router.post("/tarefas/criar", new TarefaController().criar);
router.get("/tarefas/remover/:id", new TarefaController().remover);
router.get("/tarefas/atualizar/:id", new TarefaController().atualizar);
router.get("/tarefas/procurar/:id", new TarefaController().procurar);
router.get("/tarefas/listar", new TarefaController().listar);

router.post("/categorias/criar", new CategoriaContoller().criar);
router.get("/categorias/remover/:id", new CategoriaContoller().remover);
router.get("/categorias/atualizar/:id", new CategoriaContoller().atualizar);
router.get("/categorias/procurar/:id", new CategoriaContoller().procurar);
router.get("/categorias/listar", new CategoriaContoller().listar);

router.post("/rotinas/criar", new RotinaController().criar);
router.get("/rotinas/remover/:id", new RotinaController().remover);
router.get("/rotinas/atualizar/:id", new RotinaController().atualizar);
router.get("/rotinas/adicionar/:id", new TarefaController().criar);
router.get("/rotinas/listarTarefas/:id", new TarefaController().procurarPorRotina);
router.get("/rotinas/procurar/:id", new RotinaController().procurar);
router.get("/rotinas/listar", new RotinaController().listar);

router.post("/lembretes/criar", new LembreteController().criar);
router.get("/lembretes/remover/:id", new LembreteController().remover);
router.get("/lembretes/atualizar/:id", new LembreteController().atualizar);
router.get("/lembretes/procurar/:id", new LembreteController().procurar);
router.get("/lembretes/listar", new LembreteController().listar);

router.post("/lembretes_padrao/criar", new LembretePadraoController().criar);
router.get("/lembretes_padrao/remover/:id", new LembretePadraoController().remover);
router.get("/lembretes_padrao/atualizar/:id", new LembretePadraoController().atualizar);
router.get("/lembretes_padrao/procurar/:id", new LembretePadraoController().procurar);
router.get("/lembretes_padrao/listar", new LembretePadraoController().listar);

export { router }