const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());

const voluntarioRoutes = require('./routes/voluntario.routes.js');
app.use('/api', voluntarioRoutes);

const doacaoRoutes = require("./routes/doacaoRoutes");
app.use('/api', doacaoRoutes);

module.exports = app;
