import { BaseService } from "./base.service";

export class VideosService extends BaseService {
    constructor(body, params, query) {
        super(body, params, query);
    }
    searchVideoById = async () => {
        const { _id } = this.params
        return this.model.VideosModel.findById(_id)
    }
    deleteVideoById = async (_id) => {
        return this.model.VideosModel.deleteOne({_id})
    }
}