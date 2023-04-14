import { Router } from "express";

import db from "../connection";

const usuarioRouter = Router();

usuarioRouter.get("/", async (req, res) => {
  const usuarioId = req.query.id;

  if (!usuarioId) {
    res.status(400).send("ID do usuário não informado");
    return;
  }
  const usuario = await db.query("SELECT $usuario ", {
    usuario: usuarioId,
  });
  if (!Array.isArray(usuario)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (usuario.length === 0) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  return res.json(usuario[0]);
});

usuarioRouter.get("/todos", async (req, res) => {
  const usuarios = await db.query("select * from usuario");
  if (!Array.isArray(usuarios)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (usuarios.length === 0) {
    res.json([]);
    return;
  }

  console.log("usuarios :>> ", usuarios);

  return res.json(usuarios);
});

export default usuarioRouter;
