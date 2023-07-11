import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Usuario from "../models/User.js";
import Roles from "../models/Rol.js";

export const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers["acceso-token"];
    if (!token) {
      return res.status(400).json("Se requiere un token");
    }
    const decodificacion = jwt.verify(token, JWT_SECRET);
    req.userId = decodificacion.id;
    const user = await Usuario.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(400).json("Usuario no existente");
    }

    next();
  } catch (error) {
    return res.status(400).json("No autorizado");
  }
};

export const esAdministrador = async (req, res, next) => {
  const usuarioAdmin = await Usuario.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: usuarioAdmin.role } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].nombre === "administrador") {
      next();
      return;
    }
  }

  return res.status(400).json("No Eres un Administrador");
};
