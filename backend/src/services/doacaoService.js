const DoacaoRepository = require("../repositories/doacaoRepository");

function criarDoacaoService(data) {
  if (!data.nomeDoador || !data.valor) {
    throw new Error("Nome do doador e valor são obrigatórios");
  }

  if (isNaN(data.valor) || Number(data.valor) <= 0) {
    throw new Error("Valor inválido");
  }

  return DoacaoRepository.criarDoacao(data);
}

function listarDoacoesService() {
  return DoacaoRepository.listarDoacoes();
}

function buscarDoacaoService(id) {
  const doacao = DoacaoRepository.buscarDoacaoPorId(id);

  if (!doacao) {
    throw new Error("Doação não encontrada");
  }

  return doacao;
}

module.exports = {
  criarDoacaoService,
  listarDoacoesService,
  buscarDoacaoService
};
