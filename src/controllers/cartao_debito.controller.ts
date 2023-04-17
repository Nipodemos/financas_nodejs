import { RequestHandler } from "express";
import db from "../../connection";
import { z } from "zod";

export const getTodosCartoesDebito: RequestHandler = async (req, res) => {
  const cartoesDebito = await db.query("select * from cartao_debito");
  if (!Array.isArray(cartoesDebito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartoesDebito.length === 0) {
    res.json([]);
    return;
  }

  return res.json(cartoesDebito);
};

export const getCartaoDebitoPorId: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoDebito = await db.query(
    "select * from cartao_debito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoDebito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  if (cartaoDebito.length === 0) {
    res.status(404).send("Cartão de débito não encontrado");
    return;
  }

  return res.json(cartaoDebito[0]);
};

export const criarCartaoDebito: RequestHandler = async (req, res) => {
  const cartaoDebitoSchema = z.object({
    nome: z.string(),
    numero: z.string(),
    bandeira: z.string(),
  });
  try {
    cartaoDebitoSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, numero, bandeira }: z.infer<typeof cartaoDebitoSchema> =
    req.body;
  const cartaoDebito = await db.query(
    "insert into cartao_debito (nome, numero, bandeira) values ($nome, $numero, $bandeira)",
    {
      nome,
      numero,
      bandeira,
    }
  );
  if (!Array.isArray(cartaoDebito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(cartaoDebito[0]);
};

export const atualizarCartaoDebito: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoDebitoSchema = z.object({
    nome: z.string(),
    numero: z.string(),
    bandeira: z.string(),
  });
  try {
    cartaoDebitoSchema.parse(req.body);
  } catch (error) {
    res.status(400).send("Dados inválidos");
    return;
  }

  const { nome, numero, bandeira }: z.infer<typeof cartaoDebitoSchema> =
    req.body;
  const cartaoDebito = await db.query(
    "update cartao_debito set nome = $nome, numero = $numero, bandeira = $bandeira where id == $id",
    {
      nome,
      numero,
      bandeira,
      id,
    }
  );
  if (!Array.isArray(cartaoDebito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(cartaoDebito[0]);
};

export const deletarCartaoDebito: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const cartaoDebito = await db.query(
    "delete from cartao_debito where id == $id",
    {
      id,
    }
  );
  if (!Array.isArray(cartaoDebito)) {
    res.status(500).send("Erro ao consultar banco de dados");
    return;
  }

  return res.json(cartaoDebito[0]);
};
