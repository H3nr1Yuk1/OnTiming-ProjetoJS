import { Outlet } from "react-router-dom";
import Menu from "./layouts/menu";

function App() {
  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;
