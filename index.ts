import express from "express";
import cors from "cors";
import "./config";
import { env } from "./config";

const app = express();
const router = express.Router();

import Surreal from "surrealdb.js";

const db = new Surreal("http://127.0.0.1:8000/rpc");

router.get("/", async (req, res) => {
  try {
    console.log("tentando logar");
    await db.signin({
      user: "root",
      pass: "root",
    });

    console.log('logado, usando db "test"');
    // Select a specific namespace / database
    await db.use("test", "test");
  } catch (error) {
    console.log("falhou");
  }

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
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
