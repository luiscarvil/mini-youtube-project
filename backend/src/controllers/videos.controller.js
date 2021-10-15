import { BaseController } from "./base.controller.js";

export class VideosController extends BaseController {
  constructor() {
    super();
  }

  uploadFile = async (req, res, next) => {
    console.log("here the body", req.body)
    try {
      const serviceS3 = new this.services.S3Service(req.file);
      const videoService = new this.services.VideosService(req.body)

      const fileUpload = await serviceS3.uploadFile();
      await videoService.saveVideo(fileUpload.key) 
      res.send({ message: "Archivo cargado satisfactoriamente", error: null});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  uploadVideoThumbnails = async (req, res, next) => {
    try {
      const serviceS3 = new this.services.S3Service(req.file);
      const videoService = new this.services.VideosService(req.body)
      const video = await videoService.searchVideoById()
      if (!video){
        throw new this.errors.CustomError("no se pudo encontrar el video, intenta actualizar de nuevo")
      }
      const fileUpload = await serviceS3.uploadFileThumbnails();
      console.log("here")
      await videoService.updateVideoThumbnails(fileUpload.url) 
      res.send({ message: "Captura guardada satisfactoriamente", error: null });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


  streamVideo = async (req, res, next) => {
    try {
      const videoService = new this.services.VideosService(null,req.params)
      const serviceS3 = new this.services.S3Service(req.file);
      const findVideo = await videoService.searchVideoById();
      if (!findVideo.video_key){
        throw new this.errors.CustomError("No se ha encontrado el video")
      }
      const readStream = await serviceS3.getFileStream(findVideo.video_key)
      readStream.pipe(res)  
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
      await serviceS3.deleteFile(path)
      await serviceVideos.deleteVideoById(findVideo._id)
      res.send({ message: "Archivo eliminado satisfactoriamente", error: null });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  searchAll = async (req, res, next) =>{
    try {
      const serviceVideos = new this.services.VideosService();
      const findVideo = await serviceVideos.searchAllVideos()
   /*    const conv = ffmpeg()
      console.log("f", findVideo)
   */    res.send(findVideo)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  searchByWords = async (req, res, next) =>{
    const params = req.params
    try {
      const serviceVideos = new this.services.VideosService(null, params);
      const findVideo = await serviceVideos.searchVideoByWord()
      res.send(findVideo)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
