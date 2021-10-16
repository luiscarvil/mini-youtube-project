import {Router} from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { sigInValidator, verifySignUp, verifySignIn } from '../validators/index.js'
import { validRequest } from '../middleware/index.js'
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
authRouter.post(`${prefix}/signUp`, sigInValidator, validRequest, controller.signUp)
// TODO validar campos email(correo valido), code(numeric code)

authRouter.post(`${prefix}/verify-signUp`, verifySignUp, validRequest, controller.verifySignUp)

// validar correo (email valido) y contraseña (no en blanco y string)
authRouter.post(`${prefix}/signIn`, verifySignIn, validRequest, controller.signIn)