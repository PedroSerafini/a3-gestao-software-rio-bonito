const express = require("express");
const router = express.Router();
const DoacaoController = require("../controllers/doacaoController");

router.post("/doacoes", DoacaoController.criar);
router.get("/doacoes", DoacaoController.listar);
router.get("/doacoes/:id", DoacaoController.buscarPorId);

module.exports = router;
