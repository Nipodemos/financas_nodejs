import { RequestHandler } from "express";
import db from "../../connection";
import { z } from "zod";

export const getTodasCategorias: RequestHandler = async (req, res) => {
  if (!req.query.tipo) {
    res.status(400).send("Tipo não informado");
    return;
  }
  if (typeof req.query.tipo !== "string") {
    res.status(400).send("Tipo inválido");
    return;
  } else if (req.query.tipo !== "receita" && req.query.tipo !== "despesa") {
    res.status(400).send("Tipo inválido");
    return;
  }

  const tipo = req.query.tipo;
  const categorias = await db.query(
    "select * from categoria where tipo == type::string($tipo)",
    {
      tipo,
    }
  );
  if (!Array.isArray(categorias)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (categorias.length === 0) {
    res.json([]);
    return;
  }

  console.log("categorias :>> ", categorias);

  return res.json(categorias);
};

export const criarCategoria: RequestHandler = async (req, res) => {
  const categoriaSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
  });
  try {
    categoriaSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, tipo }: z.infer<typeof categoriaSchema> = req.body;
  const categoria = await db.query(
    "insert into categoria (nome, tipo) values ($nome, type::string($tipo))",
    {
      nome,
      tipo,
    }
  );
  if (!Array.isArray(categoria)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (categoria.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(categoria[0]);
};

export const atualizarCategoria: RequestHandler = async (req, res) => {
  const categoriaSchema = z.object({
    id: z.string(),
    nome: z.string(),
    tipo: z.string(),
  });
  try {
    categoriaSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { id, nome, tipo }: z.infer<typeof categoriaSchema> = req.body;
  const categoria = await db.query(
    "update categoria set nome = $nome, tipo = type::string($tipo) where id = $id",
    {
      id,
      nome,
      tipo,
    }
  );
  if (!Array.isArray(categoria)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (categoria.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(categoria[0]);
};

export const deletarCategoria: RequestHandler = async (req, res) => {
  const categoriaSchema = z.object({
    id: z.string(),
  });
  try {
    categoriaSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { id }: z.infer<typeof categoriaSchema> = req.body;
  const categoria = await db.query("delete from $id", {
    id,
  });
  if (!Array.isArray(categoria)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (categoria.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(categoria[0]);
};
