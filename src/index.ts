//Instalar a extenção no RestClient no VSCode
//Instalação do Prisma e o adaptando para TypeScript
//Chamando tudo que foi instalado: npm i
//Limpar banco de dados
    //1 - delete o dev.db
    //2 - npx prisma migrate dev
    //3 - npx prisma migrate reset
//Ver banco de dados: https://inloop.github.io/sqlite-viewer/

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

