import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LembreteController {
    async criar(request : Request, response : Response) {
        let validar : boolean = false;
        async function criarLembrete(popUp : boolean, popUpMsg : string, alarme : boolean, alarmeSound : string, vibracao : boolean, vibType : string, vibCount : number, notificacao : string) {
            let lembreteNovo = null;
            try {
                lembreteNovo = await prisma.lembrete.create({
                    data: {
                        popUp : popUp,
                        popUpMsg : popUpMsg,
                        alarme : alarme,
                        alarmeSound : alarmeSound,
                        vibracao : vibracao,
                        vibType : vibType,
                        vibCount : vibCount,
                        notificacao : notificacao
                    }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(lembreteNovo != null){
                    validar = true;
                    return lembreteNovo;
                }
            }
        }

        const result = await criarLembrete(request.body.popUp, request.body.popUpMsg, request.body.alarme, request.body.alarmeSound, request.body.vibracao, request.body.vibType, request.body.vibCount, request.body.notificacao)

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Lembrete criado", lembrete : result}
            );
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Lembrete já existente!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }

    async remover(request : Request, response : Response) {
        let validar : boolean = false
        async function removerLembrete(id : number) {
            try {
                await prisma.lembrete.delete({
                    where: { id : id}
                })
                validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
            }
        }

        const result = await removerLembrete(Number(request.params.id))

        if(validar = true){
            return response.status(200).json(
                {message : "Lembrete apagado!"}
            );
        } else {
            return response.status(404).json(
                { message : "Lembrete não encontrado!"}
            )
        }
    }

    async atualizar (request : Request, response : Response){
        let validar : boolean = false;
        async function atualizarLembrete(id : number, popUp : boolean, popUpMsg : string, alarme : boolean, alarmeSound : string, vibracao : boolean, vibType : string, vibCount : number, notificacao : string) {
            let lembreteAtualizado = null;
            try {
                lembreteAtualizado = await prisma.lembrete.update({
                    where: { id : id},
                    data : {
                        popUp : popUp,
                        popUpMsg : popUpMsg,
                        alarme : alarme,
                        alarmeSound : alarmeSound,
                        vibracao : vibracao,
                        vibType : vibType,
                        vibCount : vibCount,
                        notificacao : notificacao
                    }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(lembreteAtualizado != null){
                    validar = true;
                    return lembreteAtualizado;
                }
            }
        }

        const result = await atualizarLembrete(Number(request.params.id), request.body.popUp, request.body.popUpMsg, request.body.alarme, request.body.alarmeSound, request.body.vibracao, request.body.vibType, request.body.vibCount, request.body.notificacao)

        if(validar = true && result != null){
            response.status(200).json(
                {message : "Lembrete atualizado!", lembrete : result}
            )
        } else {
            if(result === null){
                response.status(404).json(
                    {message : "Lembrete não encontrado!", lembrete : result}
                )
            } else {
                response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async procurar (request : Request, response : Response){
        let validar : boolean = false;
        async function procurarLembrete(id : number) {
            let lembreteEncontrado = null;
            try {
                lembreteEncontrado = await prisma.lembrete.findUnique({
                    where : { id : id }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(lembreteEncontrado != null){
                    validar = true;
                    return lembreteEncontrado;
                }
            }
        }

        const result = await procurarLembrete(Number(request.params.id))

        if(validar = true && result != null){
            response.status(200).json(
                {message : "Lembrete encontrado!", lembrete : result}
            )
        } else {
            if(result === null){
                response.status(404).json(
                    {message : "Lembrete não encontrado!"}
                )
            } else {
                response.status(404).json(
                    {message : "Erro!", erro : result}
                ) 
            }
        }
    }

    async listar (request : Request, response : Response){
        let validar : boolean = false;
        async function listarLembretes() {
            let lembretes = null;
            try {
                lembretes = await prisma.lembrete.findMany();
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(lembretes != null){
                    validar = true;
                    return lembretes;
                }
            }
        }

        const result = await listarLembretes()

        if(validar = true && result != null){
            response.status(200).json(
                {message : "Lembretes encontrados!", lembretes : result}
            )
        } else {
            if(result === null){
                response.status(404).json(
                    {message : "Não há lembretes!"}
                )
            } else {
                response.status(404).json(
                    {message : "Erro!", erro : result}
                ) 
            }
        }
    }
}