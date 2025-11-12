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

async function _clearDatabaseForTests() {
  voluntarios = [];
  proximoId = 1;
}

module.exports = {
  save,
  getAll,
  _clearDatabaseForTests,
};