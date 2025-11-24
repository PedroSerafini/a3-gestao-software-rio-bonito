import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarPage() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/voluntarios")
      .then((res) => res.json())
      .then((data) => {
        setVoluntarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar voluntários:", err);
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este voluntário?")) return;
  
    fetch(`http://localhost:3000/api/voluntarios/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar");
        // Atualiza a lista sem precisar recarregar a página
        setVoluntarios((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar voluntário:", err);
        alert("Erro ao deletar o voluntário.");
      });
  }
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Cabeçalho do Card */}
        <div style={styles.header}>
           <Link to="/" style={styles.backLink}>
            ← Voltar
          </Link>
          <div style={styles.titleContainer}>
            <h2 style={styles.title}>Lista de Voluntários</h2>
            <p style={styles.subtitle}>
              {loading ? "Carregando..." : `${voluntarios.length} registros encontrados`}
            </p>
          </div>
        </div>

        {/* Tabela */}
        {loading ? (
          <div style={styles.loadingState}>
            <p>Buscando dados...</p>
          </div>
        ) : voluntarios.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Nenhum voluntário cadastrado ainda.</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.thFirst}>Id</th>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>CPF</th>
                  <th style={styles.th}>Celular</th>
                  <th style={styles.th}>Localização</th>
                  <th style={styles.thLast}></th>
                </tr>
              </thead>
              <tbody>
                {voluntarios.map((vol, index) => (
                  <tr 
                    key={index} 
                    style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                  >
                    <td style={styles.tdFirst}>
                      {vol.id}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.nameText}>{vol.nome}</span>
                    </td>
                    <td style={styles.td}>{vol.cpf}</td>
                    <td style={styles.td}>{vol.celular}</td>
                    <td style={styles.tdLast}>
                      {vol.cidade} <span style={styles.ufTag}>{vol.uf}</span>
                    </td>
                    <td style={styles.tdLast}>
                      <button 
                        style={styles.deleteButton}
                        onClick={() => handleDelete(vol.id)}
                      >
                        Excluir
                      </button>
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
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Alinha no topo, mas com margem
    paddingTop: "60px", // Espaço do topo
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px", // Mantendo o padrão arredondado
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    maxWidth: "900px", // Card mais largo para a tabela caber bem
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
  // Estilos da Tabela
  tableContainer: {
    overflowX: "auto", // Para responsividade em telas pequenas
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  // Cabeçalho da Tabela
  th: {
    backgroundColor: "#2563eb", // Azul Padrão do sistema
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
    borderTopLeftRadius: "8px", // Arredondar canto superior esquerdo
  },
  thLast: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    borderTopRightRadius: "8px", // Arredondar canto superior direito
  },
  // Linhas
  trEven: {
    backgroundColor: "#ffffff",
  },
  trOdd: {
    backgroundColor: "#f9fafb", // Zebra striping (cinza muito claro)
  },
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
  },
  tdLast: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#4b5563",
    fontSize: "14px",
  },
  // Elementos internos
  nameText: {
    fontWeight: "600",
    color: "#1f2937",
  },
  ufTag: {
    backgroundColor: "#e5e7eb",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: "5px",
    color: "#374151",
  },
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
  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "0.2s",
  },
  deleteButtonHover: {
    backgroundColor: "#b91c1c",
  }
};