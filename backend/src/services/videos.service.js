import { BaseService } from "./base.service.js";

export class VideosService extends BaseService {
  constructor(body, params, query) {
    super(body, params, query);
  }
  saveVideo = async (video_key, user) => {
    const { title, description } = this.body;
    try {
      const videoForm = {
        _id: this.mongooseId,
        title,
        description,
        video_key,
        user_owner: user,
      };
      //console.log("here the creation", videoForm)
      return await new this.model.VideosModel(videoForm).save();
    } catch (err) {
      console.log(err);
      throw new this.errors.CustomError("Error al insertar el archivo");
    }
  };

  searchVideoById = async () => {
    const { _id } = this.params ? this.params : this.body;
    return this.model.VideosModel.findById(_id);
  };

  deleteVideoById = async (_id) => {
    return this.model.VideosModel.deleteOne({ _id });
  };

  searchAllVideos = async () => {
    return this.model.VideosModel.find();
  };

  searchVideoByWord = async () => {
    const { filter } = this.params;
    // regex to search with filter caseinsensitive
    return this.model.VideosModel.find({
      title: { $regex: filter, $options: "i" },
    });
    //TODO paginado para los  videos .limit(limit).skip(page*limit)
  };

  updateVideoThumbnails = async (thumbnail) => {
    const { _id } = this.body;
    return this.model.VideosModel.findOneAndUpdate({ _id }, { thumbnail });
  };
}