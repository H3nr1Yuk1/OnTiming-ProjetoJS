import { Request , Response } from "express";
import { Rotina } from "../Models/rotina.model";

let listaRotinas : Rotina[] = [];

export class RotinaController {
    criar(request : Request, response : Response) : Response {
        const rotinaNova : Rotina = new Rotina();
        rotinaNova.id = request.body.id;

        for(let rotina of listaRotinas){
            if(rotina.id == rotinaNova.id){
                return response.status(404).json(
                    {message : "Rotina já registrada!"}
                );
            }
        }

        rotinaNova.nome = request.body.nome;
        rotinaNova.duracao = request.body.duracao;
        rotinaNova.tarefas = request.body.tarefas;

        listaRotinas.push(rotinaNova);

        return response.status(201).json(
            {message : "Rotina criada!", newRotina : rotinaNova}
        );
    }

    remover(request : Request, response : Response) : Response {
        const id = request.params.id;

        for(let rotina of listaRotinas){
            if(String(rotina.id) === id){
                const index : number = listaRotinas.indexOf(rotina);
                listaRotinas.splice(index, 1);

                return response.status(200).json(
                    {message : "Rotina removida"}
                );
            }
        }

        return response.status(404).json(
            {message : "Rotina não encontrada!"}
        );
    }

    atualizarTarefas(request : Request, response : Response) : Response {
        const id = request.params.id;

        for(let rotina of listaRotinas){
            if(String(rotina.id) === id){
                rotina.tarefas = request.body.tarefas;

                return response.status(200).json(
                    {message : "Rotina atualizada!", rotinaNova : rotina}
                );
            }
        }

        return response.status(404).json(
            {message : "Rotina não encontrada!"}
        );
    }

    procurar(request : Request, response : Response) : Response {
        const id = request.params.id;

        for(let rotina of listaRotinas){
            if(String(rotina.id) === id){
                return response.status(200).json(
                    {message : "Rotina encontrada!", rotinaEnc : rotina}
                );
            }
        }

        return response.status(404).json(
            {message : "Rotina não encontrada!"}
        );
    }

    listar(request : Request, response : Response) : Response {
        if (listaRotinas.length != 0){
            return response.status(200).json(
                {message : "Lista de rotinas", listagem : listaRotinas}
            )
        }

        return response.status(404).json(
            {message : "Não há rotinas!"}
        )
    }
}