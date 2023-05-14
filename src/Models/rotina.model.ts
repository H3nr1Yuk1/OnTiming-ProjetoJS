import { Tarefa } from "./tarefa.model";

export class Rotina {
    id! : number;
    nome! : String;
    duracao! : String;
    tarefas! : Tarefa[];

    constructor () {
        
    }
}