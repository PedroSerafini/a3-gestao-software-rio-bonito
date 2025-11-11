const cepService = require('../../../src/services/cep.service');
const voluntarioRepository = require('../../../src/repositories/voluntario.repository');

const { criarVoluntario } = require('../../../src/services/voluntario.service');

jest.mock('../../../src/services/cep.service');
jest.mock('../../../src/repositories/voluntario.repository');

describe('Service: voluntario.service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um voluntário completo com sucesso', async () => {
    const dadosEntrada = {
      nome: 'Voluntário Teste',
      cpf: '123.456.789-00',
      celular: '11999998888',
      cep: '01001000',
    };

    const mockEndereco = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      bairro: 'Sé',
    };

    const mockVoluntarioSalvo = { id: 1, ...dadosEntrada, ...mockEndereco };

    cepService.buscarEnderecoPorCep.mockResolvedValue(mockEndereco);
    voluntarioRepository.save.mockResolvedValue(mockVoluntarioSalvo);

    const resultado = await criarVoluntario(dadosEntrada);

    expect(resultado).toEqual(mockVoluntarioSalvo);

    expect(cepService.buscarEnderecoPorCep).toHaveBeenCalledWith('01001000');
    expect(voluntarioRepository.save).toHaveBeenCalledTimes(1);

    expect(voluntarioRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Voluntário Teste',
        logradouro: 'Praça da Sé',
      })
    );
  });

  it('deve lançar um erro se dados obrigatórios faltarem', async () => {

    const dadosIncompletos = { nome: 'Teste', cep: '123' };

    await expect(criarVoluntario(dadosIncompletos))
      .rejects
      .toThrow('Dados incompletos (Nome, CPF, Celular e CEP são obrigatórios)');

    expect(cepService.buscarEnderecoPorCep).not.toHaveBeenCalled();
    expect(voluntarioRepository.save).not.toHaveBeenCalled();
  });
});