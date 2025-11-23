let doacoes = [];

function criarDoacao(doacao) {
  const novaDoacao = {
    id: doacoes.length + 1,
    nomeDoador: doacao.nomeDoador,
    valor: doacao.valor,
    data: new Date().toISOString(),
    mensagem: doacao.mensagem || null
  };

  doacoes.push(novaDoacao);
  return novaDoacao;
}

function listarDoacoes() {
  return doacoes;
}

function buscarDoacaoPorId(id) {
  return doacoes.find(d => d.id === Number(id));
}

module.exports = {
  criarDoacao,
  listarDoacoes,
  buscarDoacaoPorId
};
