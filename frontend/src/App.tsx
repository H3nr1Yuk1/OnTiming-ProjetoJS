import { Outlet } from "react-router-dom";
import Menu from "./layouts/menu";
import Footer from "./layouts/footer";

function App() {
  return (
    <div>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
