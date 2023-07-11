import express from "express";
import cors from "cors";
import morgan from "morgan";

import login from './routes/login.routes.js';
import user from './routes/user.routes.js';
import { createRoles } from './libs/createsDefaults.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createRoles()

app.use(login)
app.use(user)

export default app;
