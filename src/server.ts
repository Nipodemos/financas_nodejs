import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import { initDB } from "../connection";
import todasAsRotas from "./routes/allRoutes";
dotEnvExtended.load();
const server = express();

async function main() {
  await initDB();
  const router = express.Router();

  router.get("/", async (req, res) => {
    res.send("All systems operational");
  });
  server.use(cors());
  server.use(todasAsRotas);
  server.use(router);
}

main();

export default server;
