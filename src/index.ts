//Instalar express: npm install express
//Instalar a tipagem do Express no projeto: npm i @types/express -D
//Instalar TypeScript: npm install typescript -D
//Inicializando o TypeScript: npx tsc --init
//Instalar Tsx : npm i tsx -D
//Chamando tudo que foi instalado: npm i
//Instalar a extenção no RestClient no VSCode

import express from 'express';
import { Router } from './Config/routes';


const app = express();

app.use(express.json());
app.use(Router);

//O comando listen roda a aplicação
app.listen(3000, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3000");
});