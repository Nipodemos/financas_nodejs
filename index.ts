import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import { initDB } from "./connection";
dotEnvExtended.load();
initDB();

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
