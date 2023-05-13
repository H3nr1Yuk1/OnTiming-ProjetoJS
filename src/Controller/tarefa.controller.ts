import { Request , Response } from "express";
import { Tarefa } from "../Models/tarefa.model";

let listaTarefas : Tarefa[] = [];

export class TarefaController {
    criar(request : Request, response : Response) : Response {
        let tarefaNova : Tarefa = new Tarefa();

        tarefaNova.id = request.body.id;
        tarefaNova.nome = request.body.nome;
        tarefaNova.tempoIni = request.body.tempoIni;
        tarefaNova.tempoFim = request.body.tempoFim;
        tarefaNova.categoria = request.body.categoria;
        tarefaNova.lembrete = request.body.lembrete;

        for (let tarefa of listaTarefas){
            if(tarefaNova.id === tarefa.id){
                return response.status(404).json(
                    {message : "Tarefa já existente"}
                )
            }
        }

        listaTarefas.push(tarefaNova);

        return response.status(201).json(
            {message : "Tarefa criada!", newTarefa : tarefaNova}
        );
    }

    remover(request : Request, response : Response) : Response {
        const id = String(request.params.id);

        for (let tarefa of listaTarefas){
            if(id === String(tarefa.id)){
                const index : number = listaTarefas.indexOf(tarefa);
                listaTarefas.splice(index, 1);
                return response.status(200).json(
                    {message : "Tarefa apagada!"}
                );
                
            }
        }

        return response.status(404).json(
            {message : "Tarefa não encontrada"}
        )
    }

    atualizar(request : Request, response : Response) : Response {
        const id = String(request.params.id);

        for (let tarefa of listaTarefas){
            if(id === String(tarefa.id)){
                tarefa.tempoFim = request.body.tempoFim;
                tarefa.tempoIni = request.body.tempoIni;

                return response.status(200).json({
                    message: "Tarefa atualizada!",
                    novoHorario: {
                      tempoIni: tarefa.tempoIni,
                      tempoFim: tarefa.tempoFim
                    }
                });
            }
        }

        return response.status(404).json(
            {message : "Tarefa não encontrada"}
        )
    }

    procurar(request : Request, response : Response) : Response {
        const id = String(request.params.id);

        for (let tarefa of listaTarefas){
            if(id === String(tarefa.id)){
                return response.status(200).json(
                    {message : "Tarefa encontrada!", tarefaEncontrada : tarefa}
                );
            }
        }

        return response.status(404).json(
            {message : "Tarefa não encontrada"}
        )
    }

    listar(request : Request, response : Response) : Response {
        if (listaTarefas.length != 0){
            return response.status(200).json(
                {message : "Lista de tarefas", listagem : listaTarefas}
            )
        }

        return response.status(404).json(
            {message : "Não há tarefas!"}
        )
    }
}