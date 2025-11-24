const cepService = require('./cep.service');
const voluntarioRepository = require('../repositories/voluntario.repository');

async function criarVoluntario(dados) {
  const { nome, cpf, celular, cep } = dados;

  if (!nome || !cpf || !celular || !cep) {
    throw new Error('Dados incompletos (Nome, CPF, Celular e CEP são obrigatórios)');
  }

  const endereco = await cepService.buscarEnderecoPorCep(cep);

  const voluntarioCompleto = {
    nome,
    cpf,
    celular,
    cep: endereco.cep,
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    uf: endereco.uf,
  };

  const voluntarioSalvo = await voluntarioRepository.save(voluntarioCompleto);

  return voluntarioSalvo;
}

async function listarVoluntarios() {
  return voluntarioRepository.getAll();
}

async function removerPorId(id) {
  const removido = await voluntarioRepository.deletePorId(Number(id));
  return removido;
}

module.exports = {
  criarVoluntario,
  listarVoluntarios,
  removerPorId
};
