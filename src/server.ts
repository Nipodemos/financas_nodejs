import express from "express";
import cors from "cors";
import dotEnvExtended from "dotenv-extended";
import { initDB } from "./connection";
import todasAsRotas from "./src/routes/allRoutes";
dotEnvExtended.load();

async function main() {
  await initDB();
  const app = express();
  const router = express.Router();

  router.get("/", async (req, res) => {
    res.send("All systems operational");
  });
  app.use(cors());
  app.use(todasAsRotas);
  app.use(router);
  app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
  });
}

main();
