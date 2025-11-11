const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`[BACKEND] Servidor rodando na porta ${PORT}`);
});