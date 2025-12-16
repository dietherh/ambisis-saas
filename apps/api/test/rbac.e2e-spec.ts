import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from "supertest";

describe("RBAC (E2E)", () => {
  let app: INestApplication;
  let adminToken: string;
  let operatorToken: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    adminToken = (await login("admin@teste.com")).access_token;
    operatorToken = (await login("op@teste.com")).access_token;
  });

  function login(email: string) {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: "123456" })
      .then((r) => r.body);
  }

  it("operador NÃO pode criar empresa", async () => {
    await request(app.getHttpServer())
      .post("/companies")
      .set("Authorization", `Bearer ${operatorToken}`)
      .send({ name: "Empresa X", document: "123" })
      .expect(403);
  });

  it("admin pode criar empresa", async () => {
    await request(app.getHttpServer())
      .post("/companies")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Empresa X", document: "123" })
      .expect(201);
  });
});