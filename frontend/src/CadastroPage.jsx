import { useState } from "react";
import { Link } from "react-router-dom";

export default function CadastroPage() {
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados enviados:", form);
    alert("Voluntário cadastrado com sucesso!");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro de Voluntário</h2>

      {/* 🔙 Botão de Voltar */}
      <Link to="/" style={styles.backButton}>
        ⬅ Voltar para Home
      </Link>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>CPF</label>
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          maxLength={14}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Celular</label>
        <input
          type="text"
          name="celular"
          value={form.celular}
          maxLength={15}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>CEP</label>
        <input
          type="text"
          name="cep"
          value={form.cep}
          maxLength={8}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Logradouro</label>
        <input
          type="text"
          name="logradouro"
          value={form.logradouro}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Bairro</label>
        <input
          type="text"
          name="bairro"
          value={form.bairro}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Cidade</label>
        <input
          type="text"
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>UF</label>
        <input
          type="text"
          name="uf"
          value={form.uf}
          maxLength={2}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Cadastrar Voluntário
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    display: "inline-block",
    margin: "20px 0",
    padding: "10px 15px",
    backgroundColor: "#f73333ff",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
