import { Link, useParams } from "react-router-dom";
import "./rotinaAcesso.css"
import { useEffect, useState } from "react";
import { Rotina } from "../Models/rotina.model";
import axios from "axios";
import { Tarefa } from "../Models/tarefa.model";

function RotinaAcesso() {

    const { id } = useParams();
    const [rotina, setRotina] = useState<Rotina>();
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/rotinas/procurar/${id}`)
        .then((resposta) => {
            setRotina(resposta.data.rotina)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id])

    function apagarRotina(){
        axios
        .get(`http://localhost:3001/rotinas/remover/${id}`)
        .then((resposta) => {

        })
        .catch((error) => {
            console.log(error)
        })
    }

    function listaTarefas(){
        axios
        .get(`http://localhost:3001/rotinas/listarTarefas/${id}`)
        .then((resposta) => {
            setTarefas(resposta.data.tarefa);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        listaTarefas();
    })

    if(!rotina){
        return (
            <div>
                <h3>Carregando...</h3>
            </div>
        )
    }

    return(
        <div className="rotinaAcesso">
            <p className="nomeRotina" style={{ fontSize: "30px" }}>Rotina: <i>{rotina.nome}</i> ||| Duração: {rotina.duracao}</p>
            <div className="listaTarefas">
                <table>
                    <tbody>
                        {tarefas.map((tarefa : any) => (
                            <tr>
                                <td>{tarefa.nome}</td>
                                <td>Das: {tarefa.tempoIni}</td>
                                <td>Até: {tarefa.tempoFim}</td>
                                <td>{tarefa.categoria}</td>
                                <td>{tarefa.lembrete}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="Button"><button className="ButtonApagar" onClick={apagarRotina}><Link to="/rotinas" className="LinkRA">Apagar Rotina</Link></button></div>
        </div>
    )
}

export default RotinaAcesso;