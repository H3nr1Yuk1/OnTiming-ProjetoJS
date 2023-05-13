//Criação de tarefa: tipo(Bloco de horas ou Rotina) ; Bloco de horas tem Nome, Duração, Categoria e Lembrete. ; Rotina contém tarefas de blocos de hora, nome e duração.

import { Categoria } from "./categoria.model";
import { Lembrete } from "./lembrete.models";

export class Tarefa{
    id! : number;
    nome! : String;
    tempoIni! : String;
    tempoFim! : String;
    categoria! : Categoria;
    lembrete! : Lembrete;

    constructor () {

    }
}