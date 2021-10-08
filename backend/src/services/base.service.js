import AWS from "aws-sdk";
import mongoose from 'mongoose'
import * as model from '../models/index.js'
import * as errors from '../errors/index.js'

export class BaseService {
    constructor(body, params, query){
        this.model = model
        this.errors = errors
        this.aws = AWS
        this.body = body
        this.params = params
        this.query = query
        this.mongooseId = new mongoose.Types.ObjectId()
    }
}