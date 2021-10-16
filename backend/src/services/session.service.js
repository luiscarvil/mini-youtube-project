import { BaseService } from "./base.service.js";

export class SessionService extends BaseService {
  constructor() {
    super();
  }
  createSession = async (userId, expiration) => {
      const formSession = { _id: this.mongooseId, expiration, user_session: userId }
     // console.log("Here the session-->", formSession)
    return new this.model.SessionModel(formSession).save();
  };
  get = async _id => this.model.SessionModel.findById(_id)

  delete = async (_id) => {
    try{
    return this.model.SessionModel.deleteOne({_id})
    }catch(err){
      throw new this.errors.CustomError("Error al borrar la session")
    }
  }
  
}