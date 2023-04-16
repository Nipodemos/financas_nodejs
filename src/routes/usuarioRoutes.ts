import { Router } from "express";
import {
  alterarUsuario,
  criarUsuario,
  excluirUsuario,
  getTodosUsuarios,
  getUsuario,
} from "../controllers/usuario.controller";

const usuarioRouter = Router();

usuarioRouter.get("/", getUsuario);

usuarioRouter.get("/todos", getTodosUsuarios);

usuarioRouter.post("/", criarUsuario);

usuarioRouter.put("/", alterarUsuario);

usuarioRouter.delete("/", excluirUsuario);

export default usuarioRouter;
