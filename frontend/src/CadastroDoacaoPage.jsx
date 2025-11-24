import { useState } from "react";
import { Link } from "react-router-dom";

export default function CadastroDoacaoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nomeDoador: "",
    valor: "",
    mensagem: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Converte valor para número float para garantir formato correto
    const payload = {
        ...form,
        valor: parseFloat(form.valor)
    };

    try {
      // Ajuste a URL se necessário (ex: /doacoes)
      const response = await fetch("http://localhost:3000/api/doacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar doação");
      }

      alert("Doação registrada com sucesso!");
      setForm({ nomeDoador: "", valor: "", mensagem: "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Voltar
          </Link>
          <h2 style={styles.title}>Nova Doação</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Nome do Doador */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome do Doador</label>
            <input
              type="text"
              name="nomeDoador"
              value={form.nomeDoador}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Ex: Empresa X ou Anônimo"
            />
          </div>

          {/* Valor */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Valor da Doação (R$)</label>
            <input
              type="number"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              required
              step="0.01" // Permite centavos
              min="0"
              style={styles.input}
              placeholder="0.00"
            />
          </div>

          {/* Mensagem (Opcional) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mensagem de Apoio (Opcional)</label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows={4}
              style={styles.textarea}
              placeholder="Escreva uma mensagem para ficar registrada..."
            />
          </div>

          {/* Botão de Ação */}
          <button 
            type="submit" 
            style={{
                ...styles.button, 
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
            }} 
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Registrar Doação"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // Cinza padrão do sistema
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    maxWidth: "500px", // Card um pouco mais estreito que o de voluntário, pois tem menos campos
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "15px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#111827",
    margin: 0,
  },
  backLink: {
    fontSize: "14px",
    color: "#6b7280",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
  },
  // Novo estilo específico para Textarea
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    resize: "vertical", // Permite usuário aumentar altura se quiser
    minHeight: "80px",
    fontFamily: "inherit", // Garante a mesma fonte do input
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    backgroundColor: "#2563eb", // Azul padrão
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
};