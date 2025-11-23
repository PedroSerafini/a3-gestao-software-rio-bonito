import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  // Estados de Hover para Voluntários
  const [hoverVolCad, setHoverVolCad] = useState(false);
  const [hoverVolList, setHoverVolList] = useState(false);

  // Estados de Hover para Doações
  const [hoverDoaCad, setHoverDoaCad] = useState(false);
  const [hoverDoaList, setHoverDoaList] = useState(false);

  return (
    <div style={styles.container}>
      
      <h1 style={styles.mainTitle}>Painel de Gestão</h1>
      
      <div style={styles.cardsWrapper}>
        
        {/* === CARD 1: VOLUNTÁRIOS === */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.emoji}>🤝</span>
            <h2 style={styles.title}>Voluntários</h2>
          </div>
          <p style={styles.subtitle}>Gerencie o cadastro de pessoas.</p>

          <div style={styles.buttonContainer}>
            <Link 
              to="/voluntarios/cadastro" 
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(hoverVolCad ? styles.buttonPrimaryHover : {})
              }}
              onMouseEnter={() => setHoverVolCad(true)}
              onMouseLeave={() => setHoverVolCad(false)}
            >
              <span style={styles.icon}>➕</span> Novo Voluntário
            </Link>

            <Link 
              to="/voluntarios/listar" 
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
                ...(hoverVolList ? styles.buttonSecondaryHover : {})
              }}
              onMouseEnter={() => setHoverVolList(true)}
              onMouseLeave={() => setHoverVolList(false)}
            >
              <span style={styles.icon}>📋</span> Listar Voluntários
            </Link>
          </div>
        </div>

        {/* === CARD 2: DOAÇÕES === */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
             <span style={styles.emoji}>📦</span>
             <h2 style={styles.title}>Doações</h2>
          </div>
          <p style={styles.subtitle}>Controle entrada e saída de itens.</p>

          <div style={styles.buttonContainer}>
            <Link 
              to="/doacoes/cadastro" 
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(hoverDoaCad ? styles.buttonPrimaryHover : {})
              }}
              onMouseEnter={() => setHoverDoaCad(true)}
              onMouseLeave={() => setHoverDoaCad(false)}
            >
              <span style={styles.icon}>➕</span> Nova Doação
            </Link>

            <Link 
              to="/doacoes/listar" 
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
                ...(hoverDoaList ? styles.buttonSecondaryHover : {})
              }}
              onMouseEnter={() => setHoverDoaList(true)}
              onMouseLeave={() => setHoverDoaList(false)}
            >
              <span style={styles.icon}>📋</span> Histórico Doações
            </Link>
          </div>
        </div>

      </div>

      <p style={styles.footerText}>Sistema de Gestão v1.0.0</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column", // Muda para coluna para alinhar Título > Cards > Footer
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "40px 20px",
  },
  mainTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "40px",
    letterSpacing: "-1px",
  },
  // Container que segura os dois cards lado a lado
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap", // Permite quebra de linha em mobile
    justifyContent: "center",
    gap: "30px", // Espaço entre os cards
    width: "100%",
    maxWidth: "1000px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    flex: "1 1 350px", // Flex-grow, Flex-shrink, Basis (tamanho base)
    maxWidth: "450px", // Largura máxima de cada card
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Garante que botões fiquem alinhados se o texto variar
  },
  cardHeader: {
    marginBottom: "10px",
  },
  emoji: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "30px",
    lineHeight: "1.5",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 24px",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  // Estilo Primário
  buttonPrimary: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "1px solid #2563eb",
  },
  buttonPrimaryHover: {
    backgroundColor: "#1d4ed8",
    transform: "translateY(-1px)",
  },
  // Estilo Secundário
  buttonSecondary: {
    backgroundColor: "#ffffff",
    color: "#374151",
    border: "1px solid #d1d5db",
  },
  buttonSecondaryHover: {
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
    transform: "translateY(-1px)",
  },
  footerText: {
    marginTop: "50px",
    fontSize: "14px",
    color: "#9ca3af",
  },
};