import { RequestHandler } from "express";
import db from "../../connection";
import { z } from "zod";

export const getTodasTransacoes: RequestHandler = async (req, res) => {
  const bodySchema = z.object({
    tipo: z.enum(["receita", "despesa", "todos"]),
    dataInicio: z.date(),
    dataFim: z.date(),
  });

  try {
    bodySchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

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
  const transacoes = await db.query(
    "select * from transacao where tipo == type::string($tipo)",
    {
      tipo,
    }
  );
  if (!Array.isArray(transacoes)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (transacoes.length === 0) {
    res.json([]);
    return;
  }

  console.log("transacoes :>> ", transacoes);

  return res.json(transacoes);
};

export const criarTransacao: RequestHandler = async (req, res) => {
  const transacoeschema = z.object({
    nome: z.string(),
    tipo: z.string(),
  });
  try {
    transacoeschema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, tipo }: z.infer<typeof transacoeschema> = req.body;
  const transacao = await db.query(
    "insert into transacao (nome, tipo) values ($nome, type::string($tipo))",
    {
      nome,
      tipo,
    }
  );
  if (!Array.isArray(transacao)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (transacao.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(transacao[0]);
};

export const atualizarTransacao: RequestHandler = async (req, res) => {
  const transacoeschema = z.object({
    id: z.string(),
    nome: z.string(),
    tipo: z.string(),
  });
  try {
    transacoeschema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { id, nome, tipo }: z.infer<typeof transacoeschema> = req.body;
  const transacao = await db.query(
    "update transacao set nome = $nome, tipo = type::string($tipo) where id = $id",
    {
      id,
      nome,
      tipo,
    }
  );
  if (!Array.isArray(transacao)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (transacao.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(transacao[0]);
};

export const deletarTransacao: RequestHandler = async (req, res) => {
  const transacoeschema = z.object({
    id: z.string(),
  });
  try {
    transacoeschema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { id }: z.infer<typeof transacoeschema> = req.body;
  const transacao = await db.query("delete from $id", {
    id,
  });
  if (!Array.isArray(transacao)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (transacao.length === 0) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(transacao[0]);
};
