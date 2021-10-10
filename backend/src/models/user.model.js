import  mongoose from "mongoose";
import validator from 'validator'


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter a valid email')
            }
        }
    },
    // validar que tipo de usuario solo adminta [ admin, user]
    userType:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type: Boolean,
        required: true,
        trim:true
    },
    age:     { type: Number, min: 18, max: 65 },
    tokens: [{
        token: {
            type: String
        }
    }],
},{
    timestamps: true,
}
)

export const UsersModel = mongoose.model('Users', userSchema)