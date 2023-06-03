import { Router } from "express";
import UserController from "../controllers/UserController.mjs";

const route = Router()

route.get('/login', UserController.login)

export default route