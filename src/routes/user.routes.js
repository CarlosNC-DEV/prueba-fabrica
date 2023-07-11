import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUniqueUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

import { validateRegisterAndUpdate } from '../middlewares/validate.js';
import { verificarToken, esAdministrador } from '../middlewares/token.js';

const router = Router();

router.post("/user", validateRegisterAndUpdate, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUniqueUsers);
router.put("/user/:id", [verificarToken, esAdministrador], validateRegisterAndUpdate, updateUser);
router.delete("/user/:id", [verificarToken, esAdministrador], deleteUser);

export default router;
