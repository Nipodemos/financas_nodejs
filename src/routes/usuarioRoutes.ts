import { Router } from "express";

import db from "../../connection";
import { z } from "zod";

const usuarioRouter = Router();

usuarioRouter.get("/", async (req, res) => {
  const usuarioId = req.query.id;

  if (!usuarioId) {
    res.status(400).send("ID do usuário não informado");
    return;
  }
  if (typeof usuarioId !== "string") {
    res.status(400).send("ID do usuário inválido");
    return;
  }
  const usuario = await db.select(usuarioId);
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

usuarioRouter.post("/", async (req, res) => {
  const bodySchema = z.object({
    email: z.string().email(),
    nome: z.string().min(3),
    senha: z.string().min(6),
  });
  const parseResult = bodySchema.safeParse(req.body);

  if (!parseResult.success) {
    console.log("bodySchema :>> ", bodySchema);
    res.status(400).send("Dados inválidos");
    return;
  }
  const { email, nome, senha }: z.infer<typeof bodySchema> = req.body;

  const usuarioCriado = await db.create("usuario", { email, nome, senha });
  console.log("usuarioCriado :>> ", usuarioCriado);
  if (!Array.isArray(usuarioCriado)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }
  res.json(usuarioCriado[0]);
});

usuarioRouter.put("/", async (req, res) => {
  const bodySchema = z.object({
    email: z.string().email(),
    id: z.string().regex(/^\w:\w$/),
    nome: z.string(),
    senha: z.string(),
  });
  const parseResult = bodySchema.safeParse(req.body);

  if (!parseResult.success) {
    console.log("bodySchema :>> ", bodySchema);
    res.status(400).send("Dados inválidos");
    return;
  }
  const { email, id, nome, senha }: z.infer<typeof bodySchema> = req.body;

  const usuarioAlterado = await db.update(id, { email, nome, senha });
  console.log("usuarioAlterado :>> ", usuarioAlterado);
  if (!Array.isArray(usuarioAlterado)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }
  res.json(usuarioAlterado[0]);
});

usuarioRouter.delete("/", async (req, res) => {
  const idSchema = z.object({
    id: z.string().regex(/^\w:\w$/),
  });
  const parseResult = idSchema.safeParse(req.query);

  if (!parseResult.success) {
    console.log("idSchema :>> ", idSchema);
    res.status(400).send("Dados inválidos");
    return;
  }
  if (typeof req.query.id !== "string") {
    res.status(400).send("ID do usuário inválido");
    return;
  }
  const id = req.query.id;

  const usuarioDeletado = await db.delete(id);
  console.log("usuarioDeletado :>> ", usuarioDeletado);
  if (!Array.isArray(usuarioDeletado)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }
  res.json(usuarioDeletado[0]);
});

export default usuarioRouter;
