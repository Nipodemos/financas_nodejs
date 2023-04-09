import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import db, { initDB } from "./connection";
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

      type criarUsuarioBody = {
        nome: string;
        email: string;
        senha: string;
      };
      router.get("/criar_usuario", async (req, res) => {
        let { nome, email, senha }: criarUsuarioBody = req.body;
        console.log({ nome, email, senha });

        if (!nome || !email || !senha) {
          res.status(400).send("Dados inválidos");
          return;
        }

        if (senha.length < 6) {
          res.status(400).send("Senha muito curta");
          return;
        }

        let usuario = await db.query("SELECT COUNT()", { email });
        if (usuario) {
          res.status(400).send("Usuário já existe");
          return;
        }

        let created = await db.create("usuario", {
          nome,
          email,
          senha,
        });
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
