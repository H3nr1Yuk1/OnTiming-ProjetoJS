//Antes de tudo!
//Chamando tudo que foi instalado: npm i
//Instalar a extenção no RestClient no VSCode

import express from 'express';
import { router } from './Config/routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3000");
});