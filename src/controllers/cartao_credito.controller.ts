import { RequestHandler } from "express";
import db from "../../connection";
import { z } from "zod";

export const getTodosCartoesCredito: RequestHandler = async (req, res) => {
  const cartoesCredito = await db.query("select * from cartao_credito");
  if (!Array.isArray(cartoesCredito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartoesCredito.length === 0) {
    res.json([]);
    return;
  }

  return res.json(cartoesCredito);
};

export const getCartaoCreditoPorId: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoCredito = await db.query(
    "select * from cartao_credito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoCredito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCredito.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  return res.json(cartaoCredito[0]);
};

export const criarCartaoCredito: RequestHandler = async (req, res) => {
  const cartaoCreditoSchema = z.object({
    nome: z.string(),
    numero: z.string(),
    bandeira: z.string(),
  });
  try {
    cartaoCreditoSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, numero, bandeira }: z.infer<typeof cartaoCreditoSchema> =
    req.body;
  const cartaoCredito = await db.query(
    "insert into cartao_credito (nome, numero, bandeira) values ($nome, $numero, $bandeira)",
    {
      nome,
      numero,
      bandeira,
    }
  );
  if (!Array.isArray(cartaoCredito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCredito.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  return res.json(cartaoCredito[0]);
};

export const atualizarCartaoCredito: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoCredito = await db.query(
    "select * from cartao_credito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoCredito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCredito.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  const cartaoCreditoSchema = z.object({
    nome: z.string(),
    numero: z.string(),
    bandeira: z.string(),
  });
  try {
    cartaoCreditoSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, numero, bandeira }: z.infer<typeof cartaoCreditoSchema> =
    req.body;
  const cartaoCreditoAtualizado = await db.query(
    "update cartao_credito set nome = $nome, numero = $numero, bandeira = $bandeira where id == $id",
    {
      nome,
      numero,
      bandeira,
      id,
    }
  );
  if (!Array.isArray(cartaoCreditoAtualizado)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCreditoAtualizado.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  return res.json(cartaoCreditoAtualizado[0]);
};

export const deletarCartaoCredito: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoCredito = await db.query(
    "select * from cartao_credito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoCredito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCredito.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  const cartaoCreditoDeletado = await db.query(
    "delete from cartao_credito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoCreditoDeletado)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoCreditoDeletado.length === 0) {
    res.status(404).send("Cartão de crédito não encontrado");
    return;
  }

  return res.json(cartaoCreditoDeletado[0]);
};
