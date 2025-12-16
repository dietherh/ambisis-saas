import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Auth (E2E)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("deve autenticar um usuário válido", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "admin@teste.com",
        password: "123456",
      })
      .expect(201);

    expect(res.body).toHaveProperty("access_token");
  });
});