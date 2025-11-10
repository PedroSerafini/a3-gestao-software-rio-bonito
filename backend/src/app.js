// backend/src/app.js

const express = require('express');
const cors = require('cors'); // Importa o pacote CORS

const app = express(); // Cria a aplicação

// --- Middlewares (Configurações) ---

// 1. Permite que o React (em localhost:5173) acesse o backend
app.use(cors()); 

// 2. Permite que o Express entenda JSON (para o POST do formulário)
app.use(express.json()); 

// --- Rotas (O que o app faz) ---

// Rota de Teste "Hello World"
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Servidor backend rodando!' 
  });
});

// Aqui você vai adicionar as rotas de voluntários depois
// Ex: const voluntarioRoutes = require('./routes/voluntario.routes');
// app.use('/api', voluntarioRoutes);


// --- Exportação ---
// Exporta o app para que o server.js (e os testes) possam usá-lo
module.exports = app;