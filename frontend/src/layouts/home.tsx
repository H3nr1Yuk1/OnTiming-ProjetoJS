import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import { faBell, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="centro">
        <center className="textAnimate">
          <h1>Bem-Vindo ao <i>On Timing</i>!</h1>
          <h2>A sua aplicação de gerenciamento de tarefas</h2>
        </center>
        <div className="text">
          <center>
            <p>
              <i>On Timing é uma aplicação que te ajuda a organizar suas rotinas e tarefas.</i><br />
              <i>Com sua interface minimalista e fácilmente entendível, nossa aplicação com certeza te fará ter uma rotina mais organizada e ter ainda mais tempo para quem realmente importa:</i><br />
              <i id="lastI">Você</i>
            </p>
          </center>
        </div>
      </div>
    </>
  );
}

export default Home;