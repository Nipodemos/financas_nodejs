import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import { initDB } from "./connection";
dotEnvExtended.load();
initDB()
  .then((estaConectado) => {
    if (estaConectado) {
      console.log("Conectado ao banco de dados");

      const app = express();
      const router = express.Router();

      router.get("/", async (req, res) => {
        res.send("All systems operational");
      });

      router.get("/criar_usuario", (req, res) => {
        res.send("Criando usuário");
      });

      router.get("/alterar_usuario", (req, res) => {
        res.send("Alterando usuário");
      });

      app.use(cors());
      app.use(router);
      app.listen(process.env.PORT, () => {
        console.log("Listening on port " + process.env.PORT);
      });
    } else {
      console.log("Não foi possível conectar ao banco de dados");
    }
  })
  .catch((erro) => {
    console.log("Erro ao conectar ao banco de dados");
    console.log(erro);
  });
