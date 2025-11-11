const supertest = require('supertest');
const app = require('../../src/app');
const axios = require('axios');
const voluntarioRepository = require('../../src/repositories/voluntario.repository');

jest.mock('axios');

const request = supertest(app);

describe('API de Voluntários (Integração)', () => {

  beforeEach(async () => {
    await voluntarioRepository._clearDatabaseForTests();
    jest.clearAllMocks();
  });

  describe('POST /api/voluntarios', () => {

    it('deve criar um voluntário e retornar 201', async () => {

      const dadosEntrada = {
        nome: 'Voluntário de Integração',
        cpf: '111.222.333-44',
        celular: '11912345678',
        cep: '01001000',
      };

      const mockEndereco = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        localidade: 'São Paulo',
        uf: 'SP',
        bairro: 'Sé',
      };
      
      axios.get.mockResolvedValue({ data: mockEndereco });

      const response = await request.post('/api/voluntarios').send(dadosEntrada);

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.nome).toBe('Voluntário de Integração');

      expect(response.body.logradouro).toBe('Praça da Sé'); 
    });

    it('deve retornar 400 se faltarem dados (erro de validação)', async () => {

      const dadosIncompletos = { nome: 'Teste' };

      const response = await request.post('/api/voluntarios').send(dadosIncompletos);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Dados incompletos');

      expect(axios.get).not.toHaveBeenCalled(); 
    });
  });

  describe('GET /api/voluntarios', () => {
    
    it('deve retornar uma lista vazia quando não há voluntários', async () => {

      const response = await request.get('/api/voluntarios');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('deve retornar todos os voluntários cadastrados', async () => {

      const dadosEntrada = {
        nome: 'Voluntário 1',
        cpf: '111.222.333-44',
        celular: '11912345678',
        cep: '01001000',
      };
      const mockEndereco = { data: { logradouro: 'Praça da Sé' } };
      axios.get.mockResolvedValue(mockEndereco);
      await request.post('/api/voluntarios').send(dadosEntrada);

      const response = await request.get('/api/voluntarios');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].nome).toBe('Voluntário 1');
    });
  });
});