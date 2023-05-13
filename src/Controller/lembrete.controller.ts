import { Request , Response } from "express";
import { Lembrete } from "../Models/lembrete.models";

let listaLembrete : Lembrete [] = [];

export class LembreteController{

    criar(request : Request, response : Response) : Response {

        let lembreteNovo : Lembrete = new Lembrete();

        lembreteNovo.popUp = request.body.popUp;
        lembreteNovo.popUpMsg = request.body.popUpMsg;
        lembreteNovo.alarme = request.body.alarme;
        lembreteNovo.alarmeSound = request.body.alarmeSound;
        lembreteNovo.vibracao = request.body.vibracao;
        lembreteNovo.vibType = request.body.vibType;
        lembreteNovo.vibCount = request.body.vibCount;
        lembreteNovo.notificacao = request.body.notificacao;

        listaLembrete.push(lembreteNovo);

        return response.status(201).json(
            {message : "Lembrete criado1", newLembrete : lembreteNovo}
        );
    }

    remover(request : Request, response : Response) : Response {

        const popUp = Boolean(request.body.popUp);
        const popUpMsg = String(request.body.popUpMsg);
        const alarme = Boolean(request.body.alarme);
        const alarmeSound = String(request.body.alarmeSound);
        const vibracao = Boolean(request.body.vibracao);
        const vibType = String(request.body.vibType);
        const vibCount = Number(request.body.vibCount);
        const notificacao = String(request.body.notificacao);

        for(let lembrete of listaLembrete){
            if(lembrete.popUp === popUp && lembrete.popUpMsg === popUpMsg && lembrete.alarme === alarme && lembrete.alarmeSound === alarmeSound && lembrete.vibracao === vibracao && lembrete.vibType === vibType && lembrete.vibCount === vibCount && lembrete.notificacao === notificacao){

                const index : number = listaLembrete.indexOf(lembrete);
                listaLembrete.splice(index, 1);
                return response.status(200).json(
                    {message : "Lembrete apagado!"}
                );
            }
        }

        return response.status(404).json(
            { message : "Lembrete não encontrado!"}
        )

    }
}