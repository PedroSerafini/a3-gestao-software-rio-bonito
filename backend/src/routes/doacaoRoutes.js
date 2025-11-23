const express = require("express");
const router = express.Router();
const DoacaoController = require("../controllers/doacaoController");

router.post("/", DoacaoController.criar);
router.get("/", DoacaoController.listar);
router.get("/:id", DoacaoController.buscarPorId);

module.exports = router;
