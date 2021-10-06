
import * as services from "../services/index.js";
import * as errors from '../errors/index.js'

export class BaseController {
    constructor(){
        this.services = services
        this.errors = errors
    }
}