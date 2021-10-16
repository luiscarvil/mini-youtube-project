import { body} from 'express-validator'

export const sigInValidator = [
    body('name').isString().notEmpty().withMessage("name debe ser string"),
    //body('age').isNumeric().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
]
export const verifySignUp = [
    body('email').isEmail().notEmpty(),
    //body('code').isString().notEmpty()
]
export const verifySignIn = [
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
]