import { useEffect, useState } from "react";
import "./rotina.css"
import axios from "axios";
import { Link } from "react-router-dom";

function Rotina() { 

    const [rotinas, setRotinas] = useState([]);

    function listarRotinas(){
        axios
        .get("http://localhost:3001/rotinas/listar")
        .then((resposta) => {
            setRotinas(resposta.data.rotinas);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        listarRotinas();
    })

    return (
        <>
        <div>
            <div className="divBtn">
                <button className="ButtonCriar">Criar Rotina</button>
            </div>
            <div className="listaRotinas">
                <table>
                    <tbody>
                        {rotinas.map((rotina : any) => (
                            <tr>
                                <td className="nomeRotina">{rotina.nome}</td>
                                <td className="duracaoRotina">{rotina.duracao}</td>
                                <td className="lastTD">
                                    <Link to={`/rotinas/acesso/${rotina.id}`}>Acessar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Rotina;