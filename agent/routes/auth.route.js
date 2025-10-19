import {Router} from "express"
import { login, register, logout } from "../controllers/auth.controllers.js"

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post("/login", login)
authRoute.post("/logout", logout)

export default authRoute