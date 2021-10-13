import { param} from 'express-validator'
import mongoose from 'mongoose'

const validateIds = id =>{
    return mongoose.Types.ObjectId.isValid(id)
}

export const videoIdValidator = [
    param('_id').custom(validateIds)
]
export const filterValidator = [
    param('filter').isString().notEmpty().trim()
]