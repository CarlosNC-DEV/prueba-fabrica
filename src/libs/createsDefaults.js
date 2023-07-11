import Roles from "../models/Rol.js";

export const createRoles = async (req, res) => {
  try {
    const contador = await Roles.estimatedDocumentCount();

    if (contador > 0) {
      return;
    }

    await Promise.all([
      new Roles({ nombre: "usuario" }).save(),
      new Roles({ nombre: "administrador" }).save(),
    ]);

    res.status(200).json("!Roles Creados!");
    
  } catch (error) {
    console.error(error);
  }
};
