import User from "../models/User.js";
import Roles from '../models/Rol.js';
import mongoose, { isValidObjectId } from 'mongoose';

export const createUser = async (req, res) => {
  try {
    const userModel = new User(req.body); 
    userModel.password = await userModel.hashePassword(req.body.password)

    if (req.body.role) {
      const rolFound = await Roles.find({ nombre: { $in: req.body.role } });
      userModel.role = rolFound.map((role) => role._id);
    }
    await userModel.save();

    res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const usersFound = await User.find({state: true}).select("-password").lean();
    res.status(200).json(usersFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const getUniqueUsers = async (req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(401).json("El id no es de mongo")
    }
    const usersUniqueFound = await User.findById(id).select("-password").lean();
    if(usersUniqueFound.state == false){
      return res.status(401).json("Usuario Inhabilitado")
    }
    res.status(200).json(usersUniqueFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(401).json("El id no es de mongo")
    }
    const newUserModel = new User(req.body);
    if (req.body.password) {
      newUserModel.password = await newUserModel.hashePassword(req.body.password)
    }

    const updateUser = await User.findByIdAndUpdate(id, newUserModel)
      .select("-password")
      .lean();
    if (!updateUser) {
      return res.status(400).json("No fue posible actualizar el usuario");
    }

    res.status(200).json("Usuario actualizado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json("El id no es de mongo")
      }
      const deleteUser = await User.findByIdAndUpdate(id, {state: false})
        .select("-password")
        .lean();
      if (!deleteUser) {
        return res.status(400).json("No fue posible eliminar el usuario");
      }
  
      res.status(200).json("Usuario eliminado correctamente");

    } catch (error) {
      console.log(error);
      return res.status(500).json("Error en el servidor");
    }
  };
