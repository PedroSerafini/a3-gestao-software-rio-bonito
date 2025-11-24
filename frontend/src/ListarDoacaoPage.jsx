import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarDoacaoPage() {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ajuste a URL se necessário
    fetch("http://localhost:3000/api/doacoes")
      .then((res) => res.json())
      .then((data) => {
        setDoacoes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar doações:", err);
        setLoading(false);
      });
  }, []);

  // Função auxiliar para formatar data
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("pt-BR");
  };

  // Função auxiliar para formatar dinheiro
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Cabeçalho do Card */}
        <div style={styles.header}>
           <Link to="/" style={styles.backLink}>
            ← Voltar
          </Link>
          <div style={styles.titleContainer}>
            <h2 style={styles.title}>Histórico de Doações</h2>
            <p style={styles.subtitle}>
              {loading ? "Carregando..." : `${doacoes.length} registros encontrados`}
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div style={styles.loadingState}>
            <p>Buscando dados...</p>
          </div>
        ) : doacoes.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Nenhuma doação registrada ainda.</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.thFirst}>Data</th>
                  <th style={styles.th}>Doador</th>
                  <th style={styles.th}>Valor</th>
                  <th style={styles.thLast}>Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {doacoes.map((item, index) => (
                  <tr 
                    key={item.id || index} 
                    style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                  >
                    <td style={styles.tdFirst}>
                        <span style={styles.dateTag}>{formatDate(item.data)}</span>
                    </td>
                    <td style={styles.td}>
                        <span style={styles.nameText}>{item.nomeDoador}</span>
                    </td>
                    <td style={styles.td}>
                        <span style={styles.moneyText}>{formatCurrency(item.valor)}</span>
                    </td>
                    <td style={styles.tdLast}>
                        {item.mensagem ? (
                            <span style={styles.msgText}>{item.mensagem}</span>
                        ) : (
                            <span style={styles.emptyText}>-</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // Reutilizando exatamente o mesmo Design System
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    maxWidth: "900px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "20px",
  },
  backLink: {
    fontSize: "14px",
    color: "#6b7280",
    textDecoration: "none",
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: "10px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#111827",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  th: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  thFirst: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    borderTopLeftRadius: "8px",
  },
  thLast: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    borderTopRightRadius: "8px",
  },
  trEven: { backgroundColor: "#ffffff" },
  trOdd: { backgroundColor: "#f9fafb" },
  
  td: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#4b5563",
    fontSize: "14px",
  },
  tdFirst: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827",
    fontWeight: "500",
    width: "120px", // Data fixa
  },
  tdLast: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#4b5563",
    fontSize: "14px",
    maxWidth: "300px", // Limita largura da mensagem
  },
  
  // Elementos de Texto Específicos
  nameText: {
    fontWeight: "600",
    color: "#1f2937",
  },
  dateTag: {
    fontSize: "13px",
    color: "#6b7280",
    fontFamily: "monospace", // Estilo técnico para datas
  },
  moneyText: {
    color: "#059669", // Verde (Success) para dinheiro
    fontWeight: "bold",
  },
  msgText: {
    fontStyle: "italic",
    color: "#6b7280",
  },
  emptyText: {
    color: "#9ca3af",
  },
  
  // States
  loadingState: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  },
};