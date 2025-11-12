const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());

const voluntarioRoutes = require('./routes/voluntario.routes.js');
app.use('/api', voluntarioRoutes);

module.exports = app;
