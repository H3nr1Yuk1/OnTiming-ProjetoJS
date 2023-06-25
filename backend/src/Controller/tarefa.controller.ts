import { Tarefa } from "@prisma/client";
import { Request , Response } from "express";
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
                if(tarefaNova != null){
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
              await prisma.tarefa.delete({
                where: {id : id}
              });
              validar = true;
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
            }
        }

        const result = await removerTarefa(Number(request.params.id));

        if(validar = true){
            return response.status(201).json(
                {message : "Tarefa removida!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Tarefa não existente!"}
            )
        }
    }

    async atualizar(request : Request, response : Response) {
        let validar : boolean = false;
        async function atualizarTarefa(id : number, nome : String, tempoIni : String, tempoFim : String, rotinaId : number, categoriaId : number, lembreteId : number) {
            let tarefaAtualizada = null;
            try {
              tarefaAtualizada = await prisma.tarefa.update({
                where: { id : id },
                data: { 
                    nome : nome,
                    tempoIni : tempoIni,
                    tempoFim : tempoFim,
                    rotinaId : rotinaId,
                    categoriaId : categoriaId,
                    lembreteId : lembreteId,
                }
              });
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
              if(tarefaAtualizada != null){
                validar = true;
                return tarefaAtualizada;
              }
            }
        }

        const result = await atualizarTarefa(Number(request.params.id), request.body.nome,request.body.tempoIni, request.body.tempoFim, request.body.rotinaId, request.body.categoriaId, request.body.lembreteId);

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
              tarefaEncontrada = await prisma.tarefa.findUnique({
                where: { id : id }
              });
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(tarefaEncontrada != null){
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

    async procurarPorRotina(request : Request, response : Response) {
        let validar : boolean = false;
        async function procurarTarefa(id : number) {
            let tarefasEncontrada = null;
            try {
              tarefasEncontrada = await prisma.tarefa.findMany({
                where: { rotinaId : id }
              });
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(tarefasEncontrada != null){
                    validar = true;
                    return tarefasEncontrada;
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