import {BaseController} from './base.controller.js'

export class AuthController extends BaseController{
    constructor() {
        super();

        this.USER_CREATED = false
        this.USER_CONFIRM = true


        this.USER_TYPE = 'user'
      }
    signUp = async (req, res, next) =>{
        const body = req.body
        const userState = this.USER_CREATED
        const userType = this.USER_TYPE
        try{
           const service = new this.services.CognitoService(body)
            const userService = new this.services.UserService(body)
            // TODO transaccion para borrar el usuario en caso de que no se pueda insertar en cognito
            const userCreation = await  userService.creationUser(userState, userType)
            const response = await service.signUp()
            res.send({message: "Creado correctamente", userSub: response.userSub, userCreation })

        }catch (err){
            console.log(err)
            next( new this.errors.CustomError(`Error: ${err.message}`))
        }
    }

    verifySignUp = async (req, res, next) =>{
        const body = req.body
        const userState = this.USER_CONFIRM
        try{
           const service = new this.services.CognitoService(body)
            const userService = new this.services.UserService(body)
            // TODO transaccion para devolver el estado en caso de que no se pueda actualizar en cognito
            await userService.updateUserStatus(userState)
            const response = await service.confirmSignUp()
            //const userCreation = await  userService.creationUser(userState)
            res.send({message: "Creado correctamente", userSub: response.userSub/* , userCreation */})

        }catch (err){
            console.log(err)
            next( new this.errors.CustomError(`Error: ${err.message}`))
        }
    }

    signIn = async (req, res, next) =>{
        const body = req.body
        const expiration = this.moment().add(12, 'hours').toDate()
        try {
            const cognitoService = new this.services.CognitoService(body)
            const userService = new this.services.UserService(body)
            const sessionService = new this.services.SessionService(body)
            const jwtService = new this.services.JWTService()
            await cognitoService.signIn()
            
            // buscar si el usuario existe en la bd
            const [userExist] = await userService.findUserByEmail()
            if (!userExist){
                throw new this.errors.CustomError("No existe el usuario con el correo ingresado")
            } 
            // crear token de usuario
            console.log(userExist._id)
            const session = await sessionService.createSession(userExist._id, expiration)

            const token = await jwtService.sign({
                user: userExist._id, user_type: userExist.userType,
                session:session._id
            })

            res.set({Authorization: `${token}`})
            res.send({message: 'Sesion creada'})
        } catch (err){
            console.log(err.message)
            if (err.message === "No existe el usuario con el correo ingresado"){
                next()
            }
            next( new this.errors.CustomError(`Error: ${err.message}`))

        }
    }
}