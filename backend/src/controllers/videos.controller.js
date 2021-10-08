import { BaseController } from "./base.controller.js";

export class VideosController extends BaseController {
  constructor() {
    super();
  }

  uploadFile = async (req, res, next) => {
    try {
      const serviceS3 = new this.services.S3Service(req.file);
      const videoService = new this.services.VideosService(req.body)
      const fileUpload = await serviceS3.uploadFile();
      await videoService.saveVideo(fileUpload.key)
      res.send({ message: "Archivo cargado satisfactoriamente", error: null });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  

  removeFile = async (req, res, next) => {
    const params = req.params;
    try {
      const serviceVideos = new this.services.VideosService(null, params);
      const serviceS3 = new this.services.S3Service();
      const findVideo = await serviceVideos.searchVideoById();
      if (!findVideo){
          throw new this.errors.CustomError("No se ha encontrado el video a eliminar", 404)
      }
      // todo verificar si el path esta bien para borrar el video
      const path = findVideo.video_url.split('aws.com/').pop()
      await serviceS3.delete(path)
      await serviceVideos.delete(findVideo._id)
      res.send({ message: "Archivo eliminado satisfactoriamente", error: null });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
