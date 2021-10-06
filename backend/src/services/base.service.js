import * as model from '../models/index.js'
import * as errors from '../errors/index.js'

export class BaseService {
    constructor(body, params, query){
        this.model = model
        this.errors = errors

        this.body = body
        this.params = params
        this.query = query
    }
}