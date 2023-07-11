import { Router } from "express";
import { iniciarUsuario } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login", iniciarUsuario);

export default router;
