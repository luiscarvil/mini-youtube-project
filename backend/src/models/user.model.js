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
    userType:{
        type:String,
        default:"user",
        trim:true,
        enum: {
            values: ["admin","user"],
            message: '{VALUE} is not supported'
        }
    },
    state:{
        type: Boolean,
        required: true,
        trim:true
    },
    age:     { 
        type: Number,
        min: 18,
        default: 18
    }
},{
    timestamps: true,
}
)

export const UsersModel = mongoose.model('Users', userSchema)