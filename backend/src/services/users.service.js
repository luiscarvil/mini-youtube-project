import { BaseService } from "./base.service.js";

export class UserService extends BaseService {
  constructor(body) {
    super();
    this.body = body;
  }
  creationUser = async (state, userType) => {
    const { name, email, age } = this.body;
    try {
      const userForm = {
        _id: this.mongooseId,
        name,
        email,
        age,
        userType,
        state,
      };
     // console.log("here the creation", userForm);
      return await new this.model.UsersModel(userForm).save();
    } catch (err) {
      console.log(err);
      throw new this.errors.CustomError(`Error al crear usuario : ${err.message}`);
    }
  };

  updateUserStatus = async (state) => {
    const { email } = this.body;
    try {
      const userForm = {
        state,
      };
      // console.log("here the creation 2", userForm);
      return await this.model.UsersModel.findOneAndUpdate({email},{state});
    } catch (err) {
      console.log(err);
      throw new this.errors.CustomError(`Error al actualizar usuario : ${err.message}`);
    }
  };

  findUserByEmail = async () =>{
      const {email} = this.body
    return this.model.UsersModel.find({email})
  }
}