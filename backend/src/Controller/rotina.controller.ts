import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RotinaController {

    async criar(request : Request, response : Response) {
        let validar : boolean = false;
        async function criarRotina(nome : string, duracao : string) {
            let rotinaNova = null
            try {
                rotinaNova = await prisma.rotina.create({
                    data : {
                        nome : nome,
                        duracao : duracao,
                    }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(rotinaNova != null){
                    validar = true;
                    return rotinaNova;
                }
            }
        }

        const result = await criarRotina(request.body.nome, request.body.duracao)

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Rotina criada!", rotina : result}
            )
        } else {
            if (result === null){
                return response.status(404).json(
                    {message : "Rotina já existente!"}
                )
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async remover(request : Request, response : Response) {
        let validar : boolean = false;
        async function removerRotina(id : number) {
            try {
                await prisma.rotina.delete({
                    where : {id : id}
                });
                validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
            }
        }

        const result = await removerRotina(Number(request.params.id));
        
        if(validar = true){
            return response.status(201).json(
                {message : "Rotina removida!", rotina : result}
            )
        } else {
            return response.status(404).json(
                {message : "Rotina não existente!"}
            )            
        }
    }

    async atualizar(request : Request, response : Response) {
        let validar : boolean = false;
        async function atualizarRotina(id: number, nome: string, duracao: string) {
            let rotinaAtualizada = null;
            try {
              rotinaAtualizada = await prisma.rotina.update({
                where: { id : id },
                data : {
                    nome : nome,
                    duracao : duracao,
                }
              });
              validar = true;
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
              if (rotinaAtualizada != null) {
                return rotinaAtualizada;
              }
            }
          }

        const result = await atualizarRotina(Number(request.params.id), request.body.nome, request.body.duracao)

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Rotina atualizada!", rotina : result}
            );
        } else {
            if (result === null) {
                return response.status(404).json(
                    {message : "Rotina não encontrada!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async procurar(request : Request, response : Response) {
        let validar : boolean = false;
        async function procurarRotina(id : number) {
            let rotinaEncontrada = null;
            try {
                rotinaEncontrada = await prisma.rotina.findUnique({
                    where: { id: id },
                });
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(rotinaEncontrada != null){
                    validar = true;
                    return rotinaEncontrada;
                }
            }
        }

        const result = await procurarRotina(Number(request.params.id))

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Rotina encontrada!", rotina : result}
            );
        }else {
            if(result === null){
                return response.status(404).json(
                    {message : "Rotina não encontrada!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async listar(request : Request, response : Response) {
        let validar : boolean = true;
        async function listarRotinas() {
            let rotinas = null;
            try {
                rotinas = await prisma.rotina.findMany();
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(rotinas != null){
                    validar = true;
                    return rotinas;
                }
            }
        }

        const result = await listarRotinas();

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Lista de rotinas", rotinas : result}
            )
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Não há rotinas!"}
                )
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }        
    }
}