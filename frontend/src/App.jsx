import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CadastroPage from "./CadastroPage";
import ListarPage from "./ListarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/listar" element={<ListarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundColor: "#000000ff",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "25px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4A90E2",
    color: "#fff",
    transition: "0.3s",
  },
};

export default App;

