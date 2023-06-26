import axios from "axios";
import { useState } from "react";
import { Categoria } from "../Models/categoria.model";


function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [icone, setIcone] = useState("");

  function enviar() {
    let categoria: Categoria = new Categoria();
    categoria.nome = nome;
    categoria.cor = cor;
    categoria.icone = icone;

    axios
      .post("http://localhost:3001/categorias/criar", categoria)
      .then((resposta) => {
        setNome("");
        setCor("");
        setIcone("")
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <div>
      <h1> Cadastrar Categoria</h1>
      <div>
        <label>Nome:</label>
        <input
          type="text" required
          onChange={(event: any) => setNome(event.target.value)}
        />
      </div>
      <div>
        <label>Cor:</label>
        <input
          type="text" required
          onChange={(event: any) => setCor(event.target.value)}
        />
      </div>
      <div>
        <label>Icone:</label>
        <input
          type="text" required
          onChange={(event: any) => setIcone(event.target.value)}
        />
      </div>
      <div>
        <button onClick={enviar}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CadastroCategoria;