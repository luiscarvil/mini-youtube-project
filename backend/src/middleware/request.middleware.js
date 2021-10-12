import { validationResult } from "express-validator";
import { CustomError} from '../errors/index.js'

export  const validRequest = ( req, res, next) => {
    let errorsArr = []
    const errors = validationResult(req)

    if (errors.isEmpty()){
        next()
    } else {
        for (const err of errors.array()) {
          if (err.nestedErrors) {
            errorsArr = [ ...errorsArr, ...err.nestedErrors ]
          } else {
            errorsArr.push(err)
    
          }
        }
        const message = Array.isArray( errorsArr) &&  errorsArr.length > 0 ? `${errorsArr[0]?.msg} --> ${errorsArr[0]?.param}`: 'validación fallida'
        return next(new CustomError(message))
    }
} 