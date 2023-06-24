import "./lembrete.css";

function Lembrete() {
  return (
    <div className="login-container">
      <center><h1>Adicionar Lembrete</h1></center>
      <form>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" required />
        </div>
        <div>
          <label htmlFor="hora">Hora:</label>
          <input type="text" id="hora" required />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao"  required></textarea>
        </div>
        <div>
          <label htmlFor="variacao">Variações:</label>
          <select id="variacao">
            <option value="popup">Pop-Up</option>
            <option value="alarme">Alarme</option>
            <option value="notificacao">Notificação</option>
            <option value="vibracao">Vibração</option>
          </select>
        </div>
        <div>
          <button type="submit">Salvar Lembrete</button>
        </div>
      </form>
    </div>
  );
}

export default Lembrete;