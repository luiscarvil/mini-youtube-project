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
}