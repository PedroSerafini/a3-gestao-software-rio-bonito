import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CadastroPage from "./CadastroPage";
import ListarPage from "./ListarPage";
import CadastroDoacaoPage from "./CadastroDoacaoPage";
import ListarDoacaoPage from "./ListarDoacaoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voluntarios/cadastro" element={<CadastroPage />} />
        <Route path="/voluntarios/listar" element={<ListarPage />} />
        <Route path="/doacoes/cadastro" element={<CadastroDoacaoPage />} />
        <Route path="/doacoes/listar" element={<ListarDoacaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

