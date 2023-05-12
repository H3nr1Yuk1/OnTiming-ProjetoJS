import { Request , Response } from "express";
import { Tarefa } from "../Models/tarefa.model";

let listaTarefas : Tarefa[] = [];

export class TarefaController {
    criar(request : Request, response : Response) : Response {
        let tarefaNova : Tarefa = new Tarefa();

        tarefaNova.nome = request.body.nome;
        tarefaNova.tempoIni = request.body.tempoIni;
        tarefaNova.tempoFim = request.body.tempoFim;
        tarefaNova.categoria = request.body.categoria;
        tarefaNova.lembrete = request.body.lembrete;

        for (let tarefa of listaTarefas) {
            if (
                tarefaNova.nome === tarefa.nome &&
                tarefaNova.tempoIni === tarefa.tempoIni &&
                tarefaNova.tempoFim === tarefa.tempoFim
            ) {
              return response.status(404).json({
                message: "Já existe uma tarefa com essa mesma configuração.",
              });
            }
        }

        listaTarefas.push(tarefaNova);
        return response.status(201).json(
            {message : "Tarefa criada!"}
        );
    }
    remover(request : Request, response : Response) : Response {
        return response;
    }
    atualizar(request : Request, response : Response) : Response {
        return response;
    }
    procurar(request : Request, response : Response) : Response {
        return response;
    }
}