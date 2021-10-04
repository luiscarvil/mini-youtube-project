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
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    age:     { type: Number, min: 18, max: 65 },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
},{
    timestamps: true,
}
)

export const Users = mongoose.model('Users', userSchema)