import Surreal from "surrealdb.js";
import dotEnvExtended from "dotenv-extended";
dotEnvExtended.load();
const db = new Surreal(process.env.SURREAL_DB_HOST);

export async function initDB() {
  try {
    console.log("Initializing database...");
    console.log(
      "process.env.SURREAL_DB_PASSWORD :>> ",
      process.env.SURREAL_DB_PASSWORD
    );
    console.log(
      "process.env.SURREAL_DB_USER :>> ",
      process.env.SURREAL_DB_USER
    );
    console.log(
      "process.env.SURREAL_DB_HOST :>> ",
      process.env.SURREAL_DB_HOST
    );
    console.log("process.env.PORT :>> ", process.env.PORT);
    if (
      !process.env.SURREAL_DB_USER ||
      !process.env.SURREAL_DB_PASSWORD ||
      !process.env.SURREAL_DB_HOST
    ) {
      throw new Error("process.env.SURREAL_DB_USERNAME or DB_PASSWORD not set");
    }
    await db
      .connect(process.env.SURREAL_DB_HOST)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("Error connecting to database", err);
      });

    await db
      .signin({
        user: process.env.SURREAL_DB_USER,
        pass: process.env.SURREAL_DB_PASSWORD,
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
