const express = require('express');
const router = express.Router();
const voluntarioController = require('../controllers/voluntario.controller');

router.post('/voluntarios', voluntarioController.criar);
router.get('/voluntarios', voluntarioController.listar);

module.exports = router;