import { BaseService } from "./base.service.js";

export class VideosService extends BaseService {
    constructor(body, params, query) {
        super(body, params, query);
    }
    saveVideo = async (video_key) => {
        const {title, description, video_url, user_owner} = this.body
        try{
        const videoForm = {
            _id: this.mongooseId,
            title,
            description,
            video_key,
            user_owner: this.mongooseId
        }
        console.log("here the creation", videoForm)
        return await new this.model.VideosModel(videoForm).save()
    } catch(err){
        console.log(err)
        throw new this.errors.CustomError("Error al insertar el archivo")
    }
    }
    searchVideoById = async () => {
        const { _id } = this.params
        return this.model.VideosModel.findById(_id)
    }
    deleteVideoById = async (_id) => {
        return this.model.VideosModel.deleteOne({_id})
    }
}