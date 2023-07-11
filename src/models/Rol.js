import { Schema, model } from 'mongoose';

const rolModel = new Schema(
    {
        nombre: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: false
    }
)

export default model("role", rolModel)