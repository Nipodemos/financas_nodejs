import { Router } from "express";

import usuarioRouter from "./usuarioRoutes";

const todasAsRotas = Router();

todasAsRotas.use("/usuario", usuarioRouter);

export default todasAsRotas;
