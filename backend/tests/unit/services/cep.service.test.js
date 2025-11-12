const axios = require('axios');
const { buscarEnderecoPorCep } = require('../../../src/services/cep.service');

jest.mock('axios');

describe('Service: cep.service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o endereço correto para um CEP válido', async () => {
    const mockCep = '01001000';
    const mockEndereco = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    axios.get.mockResolvedValue({ data: mockEndereco });

    const resultado = await buscarEnderecoPorCep(mockCep);

    expect(resultado).toEqual(mockEndereco);
    expect(axios.get).toHaveBeenCalledWith(`https://viacep.com.br/ws/${mockCep}/json/`);
  });

  it('deve lançar um erro para um CEP que não existe (ViaCEP retorna {erro: true})', async () => {
    const mockCepInexistente = '00000000';
    const mockRespostaErro = { data: { erro: true } };

    axios.get.mockResolvedValue(mockRespostaErro);

    await expect(buscarEnderecoPorCep(mockCepInexistente))
      .rejects
      .toThrow('CEP não encontrado');
  });

  it('deve lançar um erro se a chamada do axios falhar (Ex: rede)', async () => {
    const mockCep = '12345678';
    
    axios.get.mockRejectedValue(new Error('Erro de rede'));

    await expect(buscarEnderecoPorCep(mockCep))
      .rejects
      .toThrow('Erro de serviço ao buscar CEP: Erro de rede');
  });
});