import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import { faBell, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="menu">
        <div className="menu-item">
            <a href="./tarefa.tsx">
              <FontAwesomeIcon icon={faCheckCircle} />
                <span>Marcar Tarefa</span>
            </a>
        </div>
        <div className="menu-item">
            <a href="../index.tsx">
               <FontAwesomeIcon icon={faBell} />
                <span>Marcar Lembrete</span>
            </a>
        </div>
    </div>
  );
}

export default Home;