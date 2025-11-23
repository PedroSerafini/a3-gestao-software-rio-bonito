import { useState } from "react";
import { Link } from "react-router-dom";

export default function CadastroPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    celular: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleBlurCep(e) {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || "Erro ao cadastrar");
      }

      alert("Voluntário cadastrado com sucesso!");
      setForm({ nome: "", cpf: "", celular: "", cep: "", logradouro: "", bairro: "", cidade: "", uf: "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Cabeçalho do Card */}
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Voltar
          </Link>
          <h2 style={styles.title}>Novo Voluntário</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Campo Nome */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Ex: João da Silva"
            />
          </div>

          {/* Linha Dupla: CPF e Celular */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CPF</label>
              <input
                type="text"
                name="cpf"
                value={form.cpf}
                maxLength={14}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="000.000.000-00"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Celular</label>
              <input
                type="text"
                name="celular"
                value={form.celular}
                maxLength={15}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          {/* Linha Dupla: CEP e Bairro (ou Logradouro se preferir) */}
          <div style={styles.row}>
            <div style={{...styles.inputGroup, flex: 1}}>
              <label style={styles.label}>CEP</label>
              <input
                type="text"
                name="cep"
                value={form.cep}
                maxLength={9}
                onChange={handleChange}
                onBlur={handleBlurCep}
                required
                style={styles.input}
                placeholder="00000-000"
              />
            </div>
             <div style={{...styles.inputGroup, flex: 2}}>
              <label style={styles.label}>Bairro</label>
              <input
                type="text"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                required
                style={styles.readOnlyInput} // Estilo visual diferente
              />
            </div>
          </div>

          {/* Campo Logradouro */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Endereço</label>
            <input
              type="text"
              name="logradouro"
              value={form.logradouro}
              onChange={handleChange}
              required
              style={styles.readOnlyInput}
            />
          </div>

          {/* Linha Dupla: Cidade e UF */}
          <div style={styles.row}>
            <div style={{ flex: 3 }}>
              <label style={styles.label}>Cidade</label>
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                required
                style={styles.readOnlyInput}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>UF</label>
              <input
                type="text"
                name="uf"
                value={form.uf}
                onChange={handleChange}
                required
                style={{ ...styles.readOnlyInput, textAlign: 'center' }}
              />
            </div>
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
            {isLoading ? "Salvando..." : "Confirmar Cadastro"}
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
    backgroundColor: "#f3f4f6", // Mesmo cinza da Home
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    maxWidth: "600px", // Limite de largura para não ficar muito esticado
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
  row: {
    display: "flex",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
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
  // Inputs preenchidos automaticamente pelo sistema ficam com fundo cinza
  readOnlyInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb", // Fundo levemente cinza
    fontSize: "15px",
    color: "#4b5563",
    outline: "none",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    backgroundColor: "#2563eb", // Azul igual da Home para consistência
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
};