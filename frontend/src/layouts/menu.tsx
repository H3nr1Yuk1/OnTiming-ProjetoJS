import { Link } from "react-router-dom";
import "./menu.css";

function Menu(){
    return(
        <>
        <nav>
            <ul>
                <Link to="/" className="Link"><li>Início</li></Link>
                <Link to="/rotinas" className="Link"><li>Rotinas</li></Link>
                <Link to="/tarefas" className="Link"><li>Tarefas</li></Link>
                <Link to="/categorias" className="Link"><li>Categorias</li></Link>
                <Link to="/lembretes_padrao" className="Link"><li>Lembretes</li></Link>
            </ul>
        </nav>
        </>
    )
}

export default Menu;