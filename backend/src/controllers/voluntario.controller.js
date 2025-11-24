const voluntarioService = require('../services/voluntario.service');

async function criar(req, res) {
  try {
    const dados = req.body; 

    const voluntarioSalvo = await voluntarioService.criarVoluntario(dados);

    res.status(201).json(voluntarioSalvo);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listar(req, res) {
  try {
    const voluntarios = await voluntarioService.listarVoluntarios();
    res.status(200).json(voluntarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar voluntários' });
  }
}

async function remover(req, res) {
  try {
    const id = req.params.id;
    const removido = await voluntarioService.removerPorId(id);

    if (!removido) {
      return res.status(404).json({ message: 'Voluntário não encontrado' });
    }

    res.status(200).json({ message: 'Voluntário removido com sucesso' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  criar,
  listar,
  remover
};