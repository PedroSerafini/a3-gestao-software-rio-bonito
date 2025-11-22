import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao Sistema de Gestão</h1>
      <p style={styles.subtitle}>Escolha uma opção para continuar:</p>

      <div style={styles.buttonContainer}>
        <Link to="/cadastro" style={{ ...styles.button, background: "#4CAF50" }}>
          Cadastrar
        </Link>

        <Link to="/listar" style={{ ...styles.button, background: "#3652f3ff" }}>
          Consultar Cadastros
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
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
    textDecoration: "none",
    color: "white",
    borderRadius: "8px",
    fontSize: "18px",
  },
};
