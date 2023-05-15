import { Request , Response } from "express";
import { Categoria } from "../Models/categoria.model";
import { Lembrete } from "../Models/lembrete.models";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export class TarefaController {
    async criar(request : Request, response : Response) {
        let validar : boolean = false;
        async function criarTarefa(nome : String, tempoIni : String, tempoFim : String,rotinaId : number, categoriaId : number, lembreteId : number) {
            let tarefaNova = null;
            try {
                tarefaNova = await prisma.tarefa.create({
                    data : {
                        nome : nome,
                        tempoIni : tempoIni,
                        tempoFim : tempoFim,
                        rotinaId : rotinaId,
                        categoriaId : categoriaId,
                        lembreteId : lembreteId
                    }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(tarefaNova != false){
                    validar = true;
                    return tarefaNova;
                }  
            }
        }

        const result = await criarTarefa(request.body.nome,request.body.tempoIni, request.body.tempoFim,request.body.rotinaId, request.body.categoriaId, request.body.lembreteId);

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Tarefa criada!", tarefa : result}
            );
        } else {
            if (result === null){
                return response.status(404).json(
                    {message : "Tarefa já existente!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }

    async remover(request : Request, response : Response) {
        let validar : boolean = false;
        async function removerTarefa(id : number) {
            try {
              const tarefas = await prisma.tarefa.findMany();
              
              for (let i = 0; i < tarefas.length; i++) {
                const tarefa = tarefas[i];
                if (tarefa.id == id){
                    await prisma.tarefa.delete({
                        where : { id : tarefa.id}
                    })
                    validar = true;
                }
              }
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
            }
        }

        const result = await removerTarefa(Number(request.params.id));

        if(validar = true && result == null){
            return response.status(201).json(
                {message : "Tarefa removida!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Tarefa não existente!"}
            )
        }
    }

    async atualizarTempo(request : Request, response : Response) {
        let validar : boolean = false;
        async function atualizaTempoTarefa(id : number, tempoIniNovo : String, tempoFimNovo : String) {
            let tarefaAtualizada = null;
            try {
              const tarefas = await prisma.tarefa.findMany();
              
              for (let i = 0; i < tarefas.length; i++) {
                const tarefa = tarefas[i];
                if (tarefa.id === id){
                    tarefaAtualizada = await prisma.tarefa.update({
                        where: { id: tarefa.id },
                        data: { tempoIni : tempoIniNovo, tempoFim : tempoFimNovo}
                      });
                }
              }
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
              if(tarefaAtualizada != false){
                validar = true;
                return tarefaAtualizada;
              }
            }
        }

        const result = await atualizaTempoTarefa(Number(request.params.id), request.body.tempoIni, request.body.tempoFim);

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Tarefa atualizada!", tarefa : result}
            )    
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Tarefa não existente!"}
                )
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async procurar(request : Request, response : Response) {
        let validar : boolean = false;
        async function procurarTarefa(id : number) {
            let tarefaEncontrada = null;
            try {
              const tarefas = await prisma.tarefa.findMany();
              
              for (let i = 0; i < tarefas.length; i++) {
                const tarefa = tarefas[i];
                if (tarefa.id === id){
                    tarefaEncontrada = await prisma.tarefa.findUnique({
                        where: { id: tarefa.id }
                    });
                    validar = true;
                }
              }
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(tarefaEncontrada != false){
                    validar = true;
                    return tarefaEncontrada;
                  }
            }
          }

        const result = await procurarTarefa(Number(request.params.id));
        
        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Tarefa encontrada!", tarefa : result}
            )    
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Tarefa não existente!"}
                )
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async listar(request : Request, response : Response) {
        let validar : boolean = false;
        let tarefas : any;
        async function listarTarefas() {
            try {
                tarefas = await prisma.tarefa.findMany();
                validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                return tarefas;
            }
        }

        const result = await listarTarefas();

        if(validar = true){
            return response.status(200).json(
                {message : "Lista de tarefas", listagem : result}
            )
        } else{
            return response.status(404).json(
                {message : "Erro!", erro : result}
            )
        }
    }
}