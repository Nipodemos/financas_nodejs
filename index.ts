import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import { z } from "zod";
// import db, { initDB } from "./connection";
import { Cirql, RecordSchema, countRecord, create } from "cirql";
dotEnvExtended.load();

async function main() {
  const cirql = new Cirql({
    connection: {
      endpoint: process.env.SURREAL_DB_HOST,
      namespace: "test",
      database: "test",
    },
    credentials: {
      user: process.env.SURREAL_DB_USER,
      pass: process.env.SURREAL_DB_PASSWORD,
    },
  });

  await cirql.ready();
  const app = express();
  const router = express.Router();

  router.get("/", async (req, res) => {
    res.send("All systems operational");
  });

  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha muito curta"),
  });
  type criarUsuarioBody = z.infer<typeof bodySchema>;
  router.post("/criar_usuario", async (req, res) => {
    let { nome, email, senha }: criarUsuarioBody = req.body;
    console.log({ nome, email, senha });

    let parseResult = bodySchema.safeParse(req.body);

    if (parseResult.success === false) {
      res.status(400).send(parseResult.error);
      return;
    }

    const Usuario = RecordSchema.extend({
      nome: z.string(),
      email: z.string().email("Email inválido"),
      senha: z.string().min(6, "Senha muito curta"),
    });
    let qtdeUsuariosComEsseEmail = await cirql.execute({
      query: countRecord("usuario").where({
        email,
      }),
    });
    if (qtdeUsuariosComEsseEmail > 0) {
      res.status(400).send("Usuário já existe");
      return;
    }

    const usuarioCriado = await cirql.execute({
      query: create("usuario").setAll({
        nome,
        email,
        senha,
      }),
      schema: Usuario,
    });
    res.status(201).json(usuarioCriado);
  });

  router.put("/alterar_usuario", (req, res) => {
    let { nome, email, senha }: criarUsuarioBody = req.body;
  });

  app.use(cors());
  app.use(router);
  app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
  });
}

main();
