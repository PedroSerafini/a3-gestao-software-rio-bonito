const DoacaoService = require("../services/doacaoService");

exports.criar = (req, res) => {
  try {
    const doacao = DoacaoService.criarDoacaoService(req.body);
    return res.status(201).json(doacao);
  } catch (error) {
    const msg = error.message || "Erro ao criar doação";
    return res.status(400).json({ erro: msg });
  }
};

exports.listar = (req, res) => {
  const doacoes = DoacaoService.listarDoacoesService();
  return res.status(200).json(doacoes);
};

exports.buscarPorId = (req, res) => {
  try {
    const doacao = DoacaoService.buscarDoacaoService(req.params.id);
    return res.status(200).json(doacao);
  } catch (error) {
    return res.status(404).json({ erro: error.message });
  }
};
