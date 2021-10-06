import { CustomError } from "./custom.error.js";

export class AuthError extends CustomError{ 
    
    constructor(){
        super('Auth Error')
        Object.setPrototypeOf(this,AuthError.prototype)
        this.STATUS_CODE = 401
    }
    serialize() {
        return{
            code: this.STATUS_CODE,
            message: 'Debe iniciar sesión',
        }
    }
}