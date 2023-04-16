import Surreal from "surrealdb.js";
import dotEnvExtended from "dotenv-extended";
dotEnvExtended.load();
const db = new Surreal(process.env.SURREAL_DB_HOST);

const { SURREAL_DB_PASSWORD, SURREAL_DB_USER, SURREAL_DB_HOST, PORT } =
  process.env;

export async function initDB() {
  try {
    console.log("Initializing database...");
    if (!SURREAL_DB_USER || !SURREAL_DB_PASSWORD || !SURREAL_DB_HOST) {
      throw new Error("SURREAL_DB_USERNAME or DB_PASSWORD not set");
    }
    await db
      .connect(SURREAL_DB_HOST)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("Error connecting to database", err);
      });

    await db
      .signin({
        user: SURREAL_DB_USER,
        pass: SURREAL_DB_PASSWORD,
      })
      .then((res) => {
        console.log("Signed in to database", res);
      })
      .catch((err) => {
        console.log("Error signing in to database", err);
      });

    await db.use("test", "financas");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
export default db;
