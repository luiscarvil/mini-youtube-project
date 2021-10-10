import {Router} from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const authRouter = Router()
const prefix = '/auth'
const controller = new AuthController()

//TODO validar campos de este formato
/* {
    "name": "luis",
    "age": "23",
    "email": "jaxegex158@ofenbuy.com",
    "password": "hellopwd12"
} */
authRouter.post(`${prefix}/signUp`, controller.signUp)
// TODO validar campos email(correo valido), code(numeric code)

authRouter.post(`${prefix}/verify-signUp`, controller.verifySignUp)

// validar correo (email valido) y contraseña (no en blanco y string)
authRouter.post(`${prefix}/signIn`, controller.signIn)