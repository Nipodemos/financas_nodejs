import supertest from "supertest";
import server from "../server";
import db from "../../connection";
describe("Usuario", () => {
  describe("getUsuario", () => {
    it("deve retornar 200", async () => {
      await db.wait();
      const response = await supertest(server).get("/usuario").query({
        id: "usuario:6pjgyub8vcd0b337ezqu",
      });
      db.close();
      expect(response.status).toBe(200);
    });
  });
});
