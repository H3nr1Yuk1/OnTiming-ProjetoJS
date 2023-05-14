//Instalar a extenção no RestClient no VSCode
//Instalação do Prisma e o adaptando para TypeScript
//Chamando tudo que foi instalado: npm i

import express from 'express';
import { router } from './Config/routes';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(router);

app.listen(3000, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3000");
});

/*

const categoria = prisma.categoria.create({
    data:{
        nome : "Dornmir",
        cor : "#00fffb",
        icone : "nuvem.png",
    }  
})

const lembrete = prisma.lembretePadrao.create({
   data:{
    nome : "Semanal Padrão",
   } 
})

*/