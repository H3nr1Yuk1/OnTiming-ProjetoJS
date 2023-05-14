//Antes de tudo!
//Chamando tudo que foi instalado: npm i
//Instalar a extenção no RestClient no VSCode

//Instalação do prisma: npm install -g prisma
//Prisma com Typescript: npm install @prisma/client prisma typescript

import express from 'express';
import { router } from './Config/routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3000");
});