import User from "../models/User.js";

export const validateRegisterAndUpdate = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name) {
    return res.status(404).json("Name es requerido");
  }
  if (!email) {
    return res.status(404).json("Email es requerido");
  }
  if (!password) {
    return res.status(404).json("Password es requerido");
  }
  if (!role) {
    return res.status(404).json("Rol es requerido");
  }

  if (role == "administrador" || role == "usuario") {
    if (!name || !email || !password || !role) {
      return res.status(404).json("Todos los datos son requeridos");
    }

    if(password.length < 6){
      return res.status(404).json("La conraseña debe tener minimo 6 caracteres");
    }

    const emailUserFound = await User.findOne({ email: email }).lean()
    if (emailUserFound) {
      return res.status(401).json("Email en uso");
    }

    next();

  } else {
    return res.status(404).json("Rol no existente");
  }
};
