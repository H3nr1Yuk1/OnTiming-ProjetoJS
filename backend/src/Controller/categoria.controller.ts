import { Request , Response } from "express";
import { Tarefa } from "../Models/tarefa.model";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export class CategoriaContoller {
    async criar(request : Request, response : Response) {
        let validar : boolean = false;
        async function criarCategoria(nome : String, cor : String, icone : String){
            let categoriaNova = null;
            try{
                categoriaNova = await prisma.categoria.create({
                    data : {
                        nome : nome,
                        cor : cor,
                        icone : icone,
                    }
                })
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(categoriaNova != null){
                    validar = true;
                    return categoriaNova;
                }
            }
        }

        const result = await criarCategoria(request.body.nome, request.body.cor, request.body.icone);

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Categoria criada!", categoria : result}
            );
        } else {
            if (result === null){
                return response.status(404).json(
                    {message : "Categoria já existente!"}
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
        async function removerCategoria(id : number) {
            try {
                await prisma.categoria.delete({
                    where : { id : id }
                })
                validar = true;
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
            }
        }

        const result = await removerCategoria(Number(request.params.id));

        if(validar = true){
            return response.status(201).json(
                {message : "Categoria removida!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Categoria não existente!", erro : result}
            )
        }
    }

    async atualizar(request : Request, response : Response) {
        let validar : boolean = false;
        async function atualizarCategoria(id : number, nome : String, cor : String, icone : String) {
            let categoriaAtualizada = null;
            try {
              categoriaAtualizada = await prisma.categoria.update({
                where: {id : id},
                data: { 
                    cor: cor,
                    nome: nome,
                    icone: icone
                 }
              });
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
              if(categoriaAtualizada != null){
                validar = true;
                return categoriaAtualizada;
              }
            }
        }

        const result = await atualizarCategoria(Number(request.params.id), request.body.nome, request.body.cor, request.body.icone);

        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Categoria atualizada!", categoria : result}
            )    
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Categoria não existente!"}
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
        async function procurarCategoria(id : number) {
            let categoriaEncontrada = null;
            try {
                categoriaEncontrada = await prisma.categoria.findUnique({
                where: { id : id}
              });
              validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(categoriaEncontrada != null){
                    validar = true;
                    return categoriaEncontrada;
                }
            }
        }

        const id = Number(request.params.id)
        const result = await procurarCategoria(id);
        
        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Categoria encontrada!", categoria : result}
            )    
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Categoria não existente!"}
                )
            } else {
                return response.status(404).json(
                    {message : "Erro!", erro : result}
                )
            }
        }
    }

    async procurarPorTarefa(request : Request, response : Response) {
        let validar : boolean = false;
        async function procurarCategoria(tarefa : any) {
            let categoriaEncontrada = null;
            try {
                categoriaEncontrada = await prisma.categoria.findUnique({
                where: { categoriaId : tarefa.categoriaId }
              });
              validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                if(categoriaEncontrada != null){
                    validar = true;
                    return categoriaEncontrada;
                }
            }
        }

        const result = await procurarCategoria(request.body.tarefa);
        
        if(validar = true && result != null){
            return response.status(201).json(
                {message : "Categoria encontrada!", categoria : result}
            )    
        } else {
            if(result === null){
                return response.status(404).json(
                    {message : "Categoria não existente!"}
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
        let categorias : any;
        async function listarCategoria() {
            try {
                categorias = await prisma.categoria.findMany();
                validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
                return categorias;
            }
        }

        const result = await listarCategoria();

        if(validar = true){
            return response.status(200).json(
                {message : "Lista de categorias", listagem : result}
            )
        } else{
            return response.status(404).json(
                {message : "Erro!", erro : result}
            )
        }
    }
}