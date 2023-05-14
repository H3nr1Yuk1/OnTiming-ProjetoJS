import { Request , Response } from "express";
import { Categoria } from "../Models/categoria.model";

let listaCategoria : Categoria[] = [];

export class CategoriaContoller {
    criar(request : Request, response : Response) : Response {
        let categoriaNova : Categoria = new Categoria();

        categoriaNova.id = request.body.id;
        categoriaNova.nome = request.body.nome;
        categoriaNova.cor = request.body.cor;
        categoriaNova.icone = request.body.icone;

        for (let categoria of listaCategoria){
            if(categoriaNova.id === categoria.id ){
                return response.status(404).json(
                    {message : "Categoria já existente"}
                )
            }
        }

        listaCategoria.push(categoriaNova);
        return response.status(201).json(
            {message : "Categoria criada!", newCategoria : categoriaNova}
        );
    }

    remover(request : Request, response : Response) : Response {
        const id = request.params.id

        for (let categoria of listaCategoria){
            if(id === String(categoria.id)){
                const index : number = listaCategoria.indexOf(categoria);
                listaCategoria.splice(index, 1);

                return response.status(200).json(
                    {message : "Categoria apagada!"}
                );
            }
        }

        return response.status(404).json(
            {message : "Categoria não encontrada!"}
        )
    }

    atualizarCor(request : Request, response : Response) : Response {
        const id = request.params.id

        for (let categoria of listaCategoria){
            if(id === String(categoria.id)){
                categoria.cor = request.body.cor;

                return response.status(200).json(
                    {message : "Categoria atualizada!", newColor : categoria}
                );
            }
        }

        return response.status(404).json(
            {message : "Categoria não encontrada!"}
        )
    }

    procurar(request : Request, response : Response) : Response {
        const id = request.params.id;

        for (let categoria of listaCategoria){
            if(id === String(categoria.id)){
                return response.status(200).json(
                    {message : "Categoria encontrada!", categoriaEncontrada : categoria}
                );
            }
        }

        return response.status(404).json(
            {message : "Categoria não encontrada!"}
        )
    }

    listar(request : Request, response : Response) : Response {
        if (listaCategoria.length != 0){
            return response.status(200).json(
                {message : "Lista de categorias", listagem : listaCategoria}
            )
        }

        return response.status(404).json(
            {message : "Não há categorias!"}
        )
    }
}