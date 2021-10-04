import * as model from '../models/index.js'

export class BaseService {
    constructor(body, params, query){
        this.model = model
    }
}