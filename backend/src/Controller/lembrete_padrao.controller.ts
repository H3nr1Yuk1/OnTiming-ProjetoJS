import { Request , Response } from "express";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export class LembretePadraoController {
    async criar (request : Request, response : Response){
        let validar : boolean = false;
        async function criarLembretePadrao(nome : string, popUp : boolean, popUpMsg : string, alarme : boolean, alarmeSound : string, vibracao : boolean, vibType : string, vibCount : number, notificacao : string) {
            let lembretePadraoNovo = null;
            try {
                lembretePadraoNovo = await prisma.lembretePadrao.create({
                    data: {
                        nome : nome,
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
                if(lembretePadraoNovo != null){
                    validar = true;
                    return lembretePadraoNovo;
                }
            }
        }

        const result = await criarLembretePadrao(request.body.nome, request.body.popUp, request.body.popUpMsg, request.body.alarme, request.body.alarmeSound, request.body.vibracao, request.body.vibType, request.body.vibCount, request.body.notificacao)

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Lembrete Padrão criado", lembretePadrao : result}
            );
        } else {
            if (result === null) {
                return response.status(404).json(
                    {message : "Lembrete Padrão já existente!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }

    async remover (request : Request, response : Response){
        let validar : boolean = false;
        async function removerLembretePadrao(id : number) {
            try {
                await prisma.lembretePadrao.delete({
                    where : { id : id }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                validar = true;
            }
        }

        const result = await removerLembretePadrao(Number(request.params.id))

        if(validar = true){
            return response.status(200).json(
                {message : "Lembrete Padrão removido!"}
            );
        } else {
            return response.status(404).json(
                {message : "Lembrete Padrão não existente!", erro : result}
            );
        }
    }

    async atualizar (request : Request, response : Response){
        let validar : boolean = true;
        async function atualizarLembretePadrao(id : number, nome : string, popUp : boolean, popUpMsg : string, alarme : boolean, alarmeSound : string, vibracao : boolean, vibType : string, vibCount : number, notificacao : string) {
            let lembretePadraoAtualizado = null;
            try {
                lembretePadraoAtualizado = await prisma.lembretePadrao.update({
                    where : { id : id },
                    data : {
                        nome : nome,
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
                if(lembretePadraoAtualizado != null){
                    validar = true;
                    return lembretePadraoAtualizado;
                }
            }
        }

        const result = await atualizarLembretePadrao(Number(request.params.id), request.body.nome, request.body.popUp, request.body.popUpMsg, request.body.alarme, request.body.alarmeSound, request.body.vibracao, request.body.vibType, request.body.vibCount, request.body.notificacao)

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Lembrete Padrão atualizado!", lembretePadrao : result}
            );
        } else {
            if (result === null) {
                return response.status(404).json(
                    {message : "Lembrete Padrão não encontrado!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }

    async procurar (request : Request, response : Response){
        let validar : boolean = false;
        async function procurarLembretePadrao(id : number) {
            let lembretePadraoEncontrado = null;
            try {
               lembretePadraoEncontrado = await prisma.lembretePadrao.findUnique({
                where : { id : id }
               })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(lembretePadraoEncontrado != null){
                    validar = true;
                    return lembretePadraoEncontrado;
                }
            }
        }

        const result = await procurarLembretePadrao(Number(request.params.id))

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Lembrete Padrão encontrado!", lembretePadrao : result}
            );
        } else {
            if (result === null) {
                return response.status(404).json(
                    {message : "Lembrete Padrão não encontrado!"}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }

    async listar (request : Request, response : Response){
        let validar : boolean = true;
        async function listarLembretePadrao() {
            let listaLembretePadrao = null;
            try {
                listaLembretePadrao = await prisma.lembretePadrao.findMany();
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(listaLembretePadrao != null){
                    validar = true;
                    return listaLembretePadrao;
                }
            }
        }

        const result = await listarLembretePadrao();

        if(validar = true && result != null){
            return response.status(200).json(
                {message : "Listagem encontrada!", lembretesPadrao : result}
            );
        } else {
            if (result === null) {
                return response.status(404).json(
                    {message : "Não há Lembretes Padrão!", erro : result}
                );
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                );
            }
        }
    }
}