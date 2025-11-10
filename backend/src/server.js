// backend/src/server.js

const app = require('./app'); // Importa o "Cérebro"

// Define a porta. 3000 é um padrão, mas pode ser 3001, 8080...
const PORT = 3000;

// Liga o servidor e fica "ouvindo" por requisições
app.listen(PORT, () => {
  console.log(`[BACKEND] Servidor rodando na porta ${PORT}`);
  console.log(`[BACKEND] Acesse http://localhost:${PORT}`);
});