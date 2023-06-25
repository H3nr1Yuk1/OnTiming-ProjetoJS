import axios from "axios";
import { useState } from "react";

function Categoria() {

    const [categoria, setCategoria] = useState([]);

    function criarCategoria(){
        axios
        .get("http://localhost:3000/categorias/criar")
        .then((resposta) => {
            setCategoria(resposta.data.categoria)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <div>
            <button onClick={criarCategoria}>Criar Categoria</button>
        </div>
        </>
    )
}

export default Categoria;