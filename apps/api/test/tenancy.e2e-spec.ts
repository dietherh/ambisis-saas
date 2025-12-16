import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from "supertest";

describe("Multi-tenancy (E2E)", () => {
  let app: INestApplication;
  let tokenOrgA: string;
  let tokenOrgB: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    tokenOrgA = (await login("adminA@org.com")).access_token;
    tokenOrgB = (await login("adminB@org.com")).access_token;
  });

  function login(email: string) {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: "123456" })
      .then((r) => r.body);
  }

  it("usuário da Org A NÃO pode acessar empresa da Org B", async () => {
    const companyB = await request(app.getHttpServer())
      .post("/companies")
      .set("Authorization", `Bearer ${tokenOrgB}`)
      .send({ name: "Empresa B", document: "999" })
      .then((r) => r.body);

    await request(app.getHttpServer())
      .get(`/companies/${companyB.id}`)
      .set("Authorization", `Bearer ${tokenOrgA}`)
      .expect(404);
  });
});