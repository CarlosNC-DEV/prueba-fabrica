import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const userModel = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: Schema.Types.ObjectId,
      require: true
    },
    state: {
      type: Boolean,
      default: true,
      require: true
    },
  },
  {
    versionKey: false,
  }
);

userModel.methods.hashePassword = async (contrasena) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(contrasena, salt);
};

userModel.statics.validatePassword = async (contrasena, password) => {
  return await bcryptjs.compare(contrasena, password);
};

export default model("users", userModel);
