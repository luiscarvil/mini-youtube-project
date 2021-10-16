import {body, param} from 'express-validator'
import  mongoose from 'mongoose'


const validateIds = id =>{
    return mongoose.Types.ObjectId.isValid(id)
}

export const createReactionValidator = [
    body('video_id').custom(validateIds),
    body('interaction').isInt().custom(inter => {
        if (inter < 1 || inter > 5 ) return false
        return true
    })
]

export const findReactionsValidator = [
    param('video_id').custom(validateIds),
]