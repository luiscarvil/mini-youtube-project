import { BaseService } from "./base.service.js";

const bucketName = process.env.AWS_S3_BUCKET
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const region = process.env.AWS_ACCESS_REGION
const accesContextVideos = process.env.AWS_S3_CONTEXT_VIDEOS
const accesContextImages = process.env.AWS_S3_CONTEXT_IMAGES

const domainS3 = process.env.AWS_S3_DOMAIN

export class S3Service extends BaseService {
  _s3 = new this.aws.S3({ region, accessKeyId, secretAccessKey });

  constructor(file) {
    super(file);
    this.file = file
  }

  uploadFile = async () => {
    const uploadParams = {
      Bucket: bucketName,
      Key: `${accesContextVideos}${new Date().getTime()}${this.file?.originalname || ""}`,
      Body: this.file?.buffer,
      };
    try {
      return this._s3.upload(uploadParams).promise();
     
  } catch (err) {
      console.log(err);
      throw new this.errors.UploadFileError(err);
    }
  };

  uploadFileThumbnails = async () => {
    const uploadParams = {
      Bucket: bucketName,
      Key: `${accesContextImages}${new Date().getTime()}${this.file?.originalname || ""}`,
      Body: this.file?.buffer,
      };
      try {
      const fileName = uploadParams.Key.replace(/\s/g, '%20')
      const data = await  this._s3.upload(uploadParams).promise();
     return {
       url : `https://${uploadParams.Bucket}.${domainS3}/${fileName}`,
       data
     }
  } catch (err) {
      console.log(err);
      throw new this.errors.CustomError(err.message);
    }
  };

  // downloads a file from s3
  getFileStream = async(fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return this._s3.getObject(downloadParams).createReadStream()
}

  /**
   * delete file from aws s3 by file name
   * @param {} fileName
   */
  deleteFile = async (fileName) => {
    try {
      const params = { Bucket: bucketNameVideos, Key: fileName };
      return this._s3.deleteObject(params).promise();
    } catch (error) {
      throw new this.errors.CustomError("error al borrar el archivo", 404);
    }
  };

}
