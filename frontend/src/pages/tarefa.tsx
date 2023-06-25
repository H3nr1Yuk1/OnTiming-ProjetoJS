import React, { useState } from "react";
import './tarefa.css';

interface Tarefa {
  tipoTarefa: string;
  nome: string;
  duracao: string;
  categoria: string;
  lembrete: string;
}

function Tarefa() {
  const [tipoTarefa, setTipoTarefa] = useState("");
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lembrete, setLembrete] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const handleTipoTarefaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoTarefa(event.target.value);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleDuracaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuracao(event.target.value);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria(event.target.value);
  };

  const handleLembreteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLembrete(event.target.value);
  };

  const handleSalvar = () => {
    const novaTarefa: Tarefa = {
      tipoTarefa,
      nome,
      duracao,
      categoria,
      lembrete
    };

    setTarefas([...tarefas, novaTarefa]);

    setTipoTarefa("");
    setNome("");
    setDuracao("");
    setCategoria("");
    setLembrete("");
  };

  const handleExcluir = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const tarefasFiltradas = categoria ? tarefas.filter(tarefa => tarefa.categoria === categoria) : tarefas;

  return (
    <div className="tarefa">
      <center>
        <h1>Criação de Tarefas</h1>
      </center>

      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} />
      </label>
      <br />

      <label>
        Duração:
        <input type="text" value={duracao} onChange={handleDuracaoChange} />
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

      <button onClick={handleSalvar}>Salvar</button>

      <h2>Rotina:</h2>
      {tarefasFiltradas.map((tarefa, index) => (
        <div key={index}>
          <p>Nome: {tarefa.nome}</p>
          <p>Duração: {tarefa.duracao}</p>
          <p>Categoria: {tarefa.categoria}</p>
          <p>Lembrete: {tarefa.lembrete}</p>
          <button onClick={() => handleExcluir(index)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Tarefa;
