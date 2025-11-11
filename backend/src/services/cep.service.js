const axios = require('axios');

const VIA_CEP_URL = 'https://viacep.com.br/ws';

async function buscarEnderecoPorCep(cep) {
  
  const cepLimpo = String(cep).replace(/\D/g, '');

  try {
    const response = await axios.get(`${VIA_CEP_URL}/${cepLimpo}/json/`);
    const data = response.data;

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return data;

  } catch (error) {
    if (error.message === 'CEP não encontrado') {
      throw error;
    }
    
    console.error('Erro na API ViaCEP:', error.message);
    throw new Error(`Erro de serviço ao buscar CEP: ${error.message}`);
  }
}

module.exports = {
  buscarEnderecoPorCep,
};