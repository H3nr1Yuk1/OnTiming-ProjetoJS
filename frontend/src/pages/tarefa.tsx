import React, { useState, useEffect } from "react";
import axios from "axios";
import './tarefa.css';

function Tarefa() {
  const [tipoTarefa, setTipoTarefa] = useState("");
  const [nome, setNome] = useState("");
  const [duracaoInicio, setDuracaoInicio] = useState("");
  const [duracaoFim, setDuracaoFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lembrete, setLembrete] = useState("");
  const [tarefa, setTarefa] = useState<Tarefa>();

  function criarTarefa() {
    axios
    .post("http://localhost:3000/tarefas/criar", tarefa)
    .then((resposta) => {
      setTarefa(resposta.data.tarefa)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  const handleTipoTarefaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoTarefa(event.target.value);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleDuracaoInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuracaoInicio(event.target.value);
  };

  const handleDuracaoFimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuracaoFim(event.target.value);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria(event.target.value);
  };

  const handleLembreteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLembrete(event.target.value);
  };

  function excluirTarefa(){
    axios
    .get(`http://localhost:3000/tarefas/remover/${id}`)
    .then((resposta) => {

    })
    .catch((error) => {
      console.log(error)
    })
  }

  function atualizarTarefa(){
    axios
    .get(`http://localhost:3000/tarefas/atualizar/${id}`, tarefa)
    .then((resposta) => {

    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="tarefa">
      <center>
        <h1>Criação de Tarefas</h1>
      </center>

      <label>
        Tipo de Tarefa:
        <select value={tipoTarefa} onChange={handleTipoTarefaChange}>
          <option value="">Selecione...</option>
          <option value="Bloco de Horas">Bloco de Horas</option>
        </select>
      </label>
      <br />

      {tipoTarefa === "Bloco de Horas" && (
        <>
          <label>
            Nome:
            <input type="text" value={nome} onChange={handleNomeChange} />
          </label>
          <br />

          <label>
            Duração Início:
            <input type="text" value={duracaoInicio} onChange={handleDuracaoInicioChange} />
          </label>
          <br />

          <label>
            Duração Fim:
            <input type="text" value={duracaoFim} onChange={handleDuracaoFimChange} />
          </label>
          <br />

          <label>
            Categoria:
            <input type="text" value={categoria} onChange={handleCategoriaChange} />
          </label>
          <br />

          <label>
            Lembrete:
            <input type="text" value={lembrete} onChange={handleLembreteChange} />
          </label>
          <br />
        </>
      )}

      <button onClick={handleSalvar}>Salvar</button>

      <h2>Tarefas:</h2>
      {tarefas.map((tarefa, index) => (
        <div key={index}>
          <p>Tipo de Tarefa: {tarefa.tipoTarefa}</p>
          <p>Nome: {tarefa.nome}</p>
          <p>Duração Início: {tarefa.duracaoInicio}</p>
          <p>Duração Fim: {tarefa.duracaoFim}</p>
          <p>Categoria: {tarefa.categoria}</p>
          <p>Lembrete: {tarefa.lembrete}</p>
          <button onClick={() => handleExcluirTarefa(index)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Tarefa;
