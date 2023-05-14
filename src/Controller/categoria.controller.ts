import { Request , Response } from "express";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export class CategoriaContoller {
    criar(request : Request, response : Response) : Response {
        async function criarCategoria(nome : String, cor : String, icone : String){
            try{
                const categoriaNova = await prisma.categoria.create({
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
            }
        }

        const result = criarCategoria(request.body.nome, request.body.cor, request.body.icone);

        if(result != null){
            return response.status(201).json(
                {message : "Categoria criada!"}
            );
        } else {
            return response.status(404).json(
                {message : "Erro!", erro : result}
            );
        }
    }

    remover(request : Request, response : Response) : Response {
        async function removerCategoria(id : number) {
            try {
              const categorias = await prisma.categoria.findMany();
              
              for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                if (categoria.id == id){
                    await prisma.categoria.delete({
                        where : { id }
                    })
                }
              }
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
            }
          }

        const id = Number(request.params.id)
        const result = removerCategoria(id);

        if(result != null){
            return response.status(201).json(
                {message : "Categoria removida!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Erro!", erro : result}
            )
        }
    }

    atualizarCor(request : Request, response : Response) : Response {
        async function atualizarCorCategoria(id : number) {
            try {
              const categorias = await prisma.categoria.findMany();
              
              for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                if (categoria.id == id){
                    await prisma.tarefa.update({
                        where: { id },
                        data: { cor : request.body.cor }
                      });
                }
              }
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
            }
          }

        const id = Number(request.params.id)
        const result = atualizarCorCategoria(id);

        if(result != null){
            return response.status(201).json(
                {message : "Categoria atualizada!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Erro!", erro : result}
            )
        }
    }

    procurar(request : Request, response : Response) : Response {
        let validar : boolean = false;
        async function procurarCategoria(id : number) {
            let categoriaEncontrada = null;
            try {
              const categorias = await prisma.categoria.findMany();
              
              for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                if (categoria.id == id){
                    categoriaEncontrada = await prisma.tarefa.findUnique({
                        where: { id }
                    });
                    validar = true;
                }
              }
            } catch (error) {
              return error;
            } finally {
              await prisma.$disconnect();
              return categoriaEncontrada;
            }
          }

        const id = Number(request.params.id)
        const result = procurarCategoria(id);

        if(validar = true){
            return response.status(201).json(
                {message : "Categoria encontrada!"}
            )    
        } else {
            return response.status(404).json(
                {message : "Erro!", erro : result}
            )
        }
    }

    listar(request : Request, response : Response) : Response {
        let validar : boolean = false;
        async function listarCategoria() {
            try {
                const categorias = await prisma.categoria.findMany();
                validar = true;
            } catch (error) {
                return error;
            } finally {
                await prisma.$disconnect();
            }
        }

        const result = listarCategoria();

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