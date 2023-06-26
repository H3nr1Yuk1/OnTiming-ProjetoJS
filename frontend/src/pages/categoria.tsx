import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./categoria.css"

function Categoria() {

    const [categorias, setCategoria] = useState([]);

    function listarCategoria(){
        axios
        .get("http://localhost:3001/categorias/listar")
        .then((resposta) => {
            setCategoria(resposta.data.listagem)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        listarCategoria();
    })


    return (
        <>
        <div>
           <div className="divBtn">
           <Link to={`/categorias/criar`}>Criar Categoria</Link>
           </div>
            <div className="listaRotinas">
                <table>
                    <tbody>
                        {categorias.map((categoria : any) => (
                            <tr>
                                <td className="nomeCategoria">{categoria.nome}</td>
                                <td className="corCategoria" style={{backgroundColor: `${categoria.cor}`}}>{categoria.cor}</td>
                                <td className="iconeCategoria">{categoria.icone}</td>
                                <td className="lastTD">
                                    <Link to={`/categorias/acesso/${categoria.id}`}>Acessar</Link>
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

export default Categoria;