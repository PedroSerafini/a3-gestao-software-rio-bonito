let voluntarios = [];
let proximoId = 1;

async function save(voluntario) {
  const novoVoluntario = { id: proximoId++, ...voluntario };
  voluntarios.push(novoVoluntario);
  return novoVoluntario;
}

async function getAll() {
  return voluntarios;
}

async function deletePorId(id) {
  const index = voluntarios.findIndex(v => v.id === id);

  if (index === -1) {
    return null; // Não encontrado
  }

  const removido = voluntarios[index];
  voluntarios.splice(index, 1);

  return removido;
}


async function _clearDatabaseForTests() {
  voluntarios = [];
  proximoId = 1;
}

module.exports = {
  save,
  getAll,
  _clearDatabaseForTests,
  deletePorId
};