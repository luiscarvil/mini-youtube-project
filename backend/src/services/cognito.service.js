import {Amplify, Auth} from 'aws-amplify'
import { CustomError } from '../errors/custom.error.js';
import { BaseService } from "./base.service.js";

const cognitoConf = {
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    region:  process.env.AWS_ACCESS_REGION
}

Amplify.configure( { Auth:cognitoConf})



export class CognitoService {
    constructor(body){
        this.body = body
    }
    signIn = async () => {
        return Auth.signIn(this.body.email, this.body.password)
    }
  
    signUp = async () => {
        return Auth.signUp(this.body.email, this.body.password)
    }
  
    confirmSignUp = async () => {
        console.log("conf", this.body)
        return Auth.confirmSignUp(this.body.email, this.body.verification);
    }
  
    passwordRecovery = async () => {
        return Auth.forgotPassword(this.body.email)
    }
  
    logOut = async () => {
        try{
      return Auth.signOut()
        }
        catch(err){
            throw new CustomError("Error al cerrar sesion")
        }
    }
  
    resendCode = async () => {
        return Auth.resendSignUp(this.body.email)
    }
  
    changePassword = async () => {
       return Auth.forgotPasswordSubmit(this.body.email, this.body.code, this.body.password)
    }

}