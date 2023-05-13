import { Lembrete } from "./lembrete.models";

export class LembreteP extends Lembrete{ 
    id! : Number;
    nome! : String;

    constructor () {
        super();
    }
}