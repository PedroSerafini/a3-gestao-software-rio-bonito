const request = require("supertest");
const app = require("../../src/app");

describe("API de Doações", () => {
  // Limpa o array de doações se houver uma função para isso no repository,
  // senão, confiamos na criação dinâmica abaixo.

  test("Deve criar uma nova doação", async () => {
    const resposta = await request(app).post("/api/doacoes").send({
      nomeDoador: "João Vitor",
      valor: 50,
      mensagem: "Continuem com o bom trabalho!",
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nomeDoador).toBe("João Vitor");
    expect(resposta.body.valor).toBe(50);
    expect(resposta.body).toHaveProperty("id"); // Garante que retornou um ID
  });

  test("Deve buscar doação por ID de forma segura", async () => {
    // 1. ARRANGE (Prepara): Cria uma doação nova só para este teste
    const doacaoCriada = await request(app).post("/api/doacoes").send({
      nomeDoador: "Doador Teste ID",
      valor: 100,
      mensagem: "Teste de ID",
    });

    const idParaBuscar = doacaoCriada.body.id;

    // 2. ACT (Age): Busca usando o ID que acabamos de receber
    const resposta = await request(app).get(`/api/doacoes/${idParaBuscar}`);

    // 3. ASSERT (Valida): Verifica se os dados batem
    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(idParaBuscar);
    expect(resposta.body.nomeDoador).toBe("Doador Teste ID");
  });

  test("Deve listar todas as doações", async () => {
    const resposta = await request(app).get("/api/doacoes");

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    // Opcional: checar se o tamanho é maior que 0 já que criamos nos testes acima
    expect(resposta.body.length).toBeGreaterThan(0);
  });

  test("Deve retornar erro 404 ao buscar doação inexistente", async () => {
    const idInexistente = 999999;
    const resposta = await request(app).get(`/api/doacoes/${idInexistente}`);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toHaveProperty("erro");
  });
});
