import { Link } from "react-router-dom";
import "./menu.css";

function Menu(){
    return(
        <>
        <nav>
            <ul>
                <Link to="/rotinas" className="Link"><li>Rotinas</li></Link>
                <Link to="/tarefas" className="Link"><li>Tarefas</li></Link>
                <Link to="categorias" className="Link"><li>Categorias</li></Link>
                <Link to="/lembretes" className="Link"><li>Lembretes</li></Link>
                <Link to="/lembretesPadrao" className="Link"><li>Lembretes</li></Link>
            </ul>
        </nav>
        </>
    )
}

export default Menu;