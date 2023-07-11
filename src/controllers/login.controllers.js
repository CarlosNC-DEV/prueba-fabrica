import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const iniciarUsuario = async(req, res)=>{
    try {
        const { email, password }= req.body;
        if(!email || !password){
            return res.status(400).json("Se requieren todos los datos");
        }
        const usuarioFound = await User.findOne({ email: email }).populate("role");
        if(!usuarioFound){
            return res.status(400).json("Correo Incorrecto");
        }

        if(usuarioFound.state == false){
            return res.status(400).json("Estas Inhabilitado");
        }

        const validatePass = await User.validatePassword(password, usuarioFound.password);
        if(!validatePass){
            return res.status(400).json("Contraseña Incorrecta");
        }

        const token = jwt.sign({ id: usuarioFound._id }, JWT_SECRET , {expiresIn: 24000});

        res.status(200).json({
            token: token,
            messagge: "Login Correcto✔"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json("!Error en el servidor!");
    }
}