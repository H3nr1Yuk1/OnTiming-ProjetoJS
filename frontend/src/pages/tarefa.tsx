import React, { useState } from "react";
import './tarefa.css';

enum DuracaoTipo {
  Diaria = "Diária",
  Semanal = "Semanal",
  Mensal = "Mensal",
  Customizada = "Customizada",
}

interface Tarefa {
  tipoTarefa: string;
  nome: string;
  duracaoInicio: string;
  duracaoFim: string;
  categoria: string;
  lembrete: string;
}

interface Rotina {
  nome: string;
  duracao: DuracaoTipo;
  duracaoEspecifica?: string;
}

function Tarefa() {
  const [tipoTarefa, setTipoTarefa] = useState("");
  const [nome, setNome] = useState("");
  const [duracaoInicio, setDuracaoInicio] = useState("");
  const [duracaoFim, setDuracaoFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lembrete, setLembrete] = useState("");
  const [rotinaNome, setRotinaNome] = useState("");
  const [rotinaDuracao, setRotinaDuracao] = useState(DuracaoTipo.Diaria);
  const [rotinaDuracaoEspecifica, setRotinaDuracaoEspecifica] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [rotinas, setRotinas] = useState<Rotina[]>([]);

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

  const handleRotinaNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotinaNome(event.target.value);
  };

  const handleRotinaDuracaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRotinaDuracao(event.target.value as DuracaoTipo);
  };

  const handleRotinaDuracaoEspecificaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotinaDuracaoEspecifica(event.target.value);
  };

  const handleSalvar = () => {
    if (tipoTarefa === "Bloco de Horas") {
      const novaTarefa: Tarefa = {
        tipoTarefa,
        nome,
        duracaoInicio,
        duracaoFim,
        categoria,
        lembrete
      };

      setTarefas([...tarefas, novaTarefa]);

      setNome("");
      setDuracaoInicio("");
      setDuracaoFim("");
      setCategoria("");
      setLembrete("");
    } else if (tipoTarefa === "Rotina") {
      const novaRotina: Rotina = {
        nome: rotinaNome,
        duracao: rotinaDuracao,
        duracaoEspecifica: rotinaDuracao === DuracaoTipo.Customizada ? rotinaDuracaoEspecifica : undefined
      };

      setRotinas([...rotinas, novaRotina]);

      setRotinaNome("");
      setRotinaDuracao(DuracaoTipo.Diaria);
      setRotinaDuracaoEspecifica("");
    }
  };

  const handleExcluirTarefa = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const handleExcluirRotina = (index: number) => {
    const novasRotinas = [...rotinas];
    novasRotinas.splice(index, 1);
    setRotinas(novasRotinas);
  };

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
          <option value="Rotina">Rotina</option>
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

      {tipoTarefa === "Rotina" && (
        <>
          <label>
            Nome da Rotina:
            <input type="text" value={rotinaNome} onChange={handleRotinaNomeChange} />
          </label>
          <br />

          <label>
            Duração da Rotina:
            <select value={rotinaDuracao} onChange={handleRotinaDuracaoChange}>
              <option value={DuracaoTipo.Diaria}>Diária</option>
              <option value={DuracaoTipo.Semanal}>Semanal</option>
              <option value={DuracaoTipo.Mensal}>Mensal</option>
              <option value={DuracaoTipo.Customizada}>Customizada</option>
            </select>
          </label>
          <br />

          {rotinaDuracao === DuracaoTipo.Customizada && (
            <label>
              Duração Específica:
              <input type="text" value={rotinaDuracaoEspecifica} onChange={handleRotinaDuracaoEspecificaChange} />
            </label>
          )}
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

      <h2>Rotinas:</h2>
      {rotinas.map((rotina, index) => (
        <div key={index}>
          <p>Nome da Rotina: {rotina.nome}</p>
          <p>Duração da Rotina: {rotina.duracao}</p>
          {rotina.duracao === DuracaoTipo.Customizada && (
            <p>Duração Específica: {rotina.duracaoEspecifica}</p>
          )}
          <button onClick={() => handleExcluirRotina(index)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Tarefa;
