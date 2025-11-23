const request = require("supertest");
const app = require("../../src/app");

describe("API de Doações", () => {

  test("Deve criar uma nova doação", async () => {
    const resposta = await request(app)
      .post("/doacoes")
      .send({
        nomeDoador: "João Vitor",
        valor: 50,
        mensagem: "Continuem com o bom trabalho!"
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nomeDoador).toBe("João Vitor");
    expect(resposta.body.valor).toBe(50);
  });

  test("Deve listar doações", async () => {
    const resposta = await request(app).get("/doacoes");

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test("Deve buscar doação por ID", async () => {
    const resposta = await request(app).get("/doacoes/1");

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(1);
  });

  test("Deve retornar erro ao buscar doação inexistente", async () => {
    const resposta = await request(app).get("/doacoes/999");

    expect(resposta.status).toBe(404);
    expect(resposta.body.erro).toBe("Doação não encontrada");
  });

});
