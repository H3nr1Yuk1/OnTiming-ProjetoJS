import React, { useState } from "react";
import axios from "axios";
import './tarefa.css';

function Tarefa() {
  const [tipoTarefa, setTipoTarefa] = useState("");
  const [nome, setNome] = useState("");
  const [duracaoInicio, setDuracaoInicio] = useState("");
  const [duracaoFim, setDuracaoFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lembrete, setLembrete] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function criarTarefa() {
    const novaTarefa = {
      tipoTarefa,
      nome,
      duracaoInicio,
      duracaoFim,
      categoria,
      lembrete
    };

    axios
      .post("http://localhost:3000/tarefas/criar", novaTarefa)
      .then((resposta: { data: { tarefa: any } }) => {
      const novaTarefaCriada: any = resposta.data.tarefa;
      setTarefas([...tarefas, novaTarefaCriada]);
      limparCampos();
    })


      .catch((error) => {
        console.log(error);
      });
  }

  const handleTipoTarefaChange = (event : any) => {
    setTipoTarefa(event.target.value);
  };

  const handleNomeChange = (event : any) => {
    setNome(event.target.value);
  };

  const handleDuracaoInicioChange = (event : any) => {
    setDuracaoInicio(event.target.value);
  };

  const handleDuracaoFimChange = (event : any) => {
    setDuracaoFim(event.target.value);
  };

  const handleCategoriaChange = (event : any) => {
    setCategoria(event.target.value);
  };

  const handleLembreteChange = (event : any) => {
    setLembrete(event.target.value);
  };

  function limparCampos() {
    setTipoTarefa("");
    setNome("");
    setDuracaoInicio("");
    setDuracaoFim("");
    setCategoria("");
    setLembrete("");
  }

  function handleExcluirTarefa(index : any) {
    const tarefaExcluida = tarefas[index];
    axios
      .get(`http://localhost:3000/tarefas/remover/${tarefaExcluida.id}`)
      .then(() => {
        const novasTarefas = [...tarefas];
        novasTarefas.splice(index, 1);
        setTarefas(novasTarefas);
      })
      .catch((error) => {
        console.log(error);
      });
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

          <button onClick={criarTarefa}>Salvar</button>
        </>
      )}

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
