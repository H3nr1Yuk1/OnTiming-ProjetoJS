import { Tarefa } from "./tarefa.model";

export class Usuario{
    nome! : String;
    email! : String;
    senha! : String;
    tarefas! : Tarefa[];

    constructor () {

    }
}