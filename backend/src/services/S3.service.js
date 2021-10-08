import { BaseService } from "./base.service.js";

const bucketName = process.env.AWS_S3_BUCKET
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const region = process.env.AWS_ACCESS_REGION
const accesContext = process.env.AWS_S3_CONTEXT
const domainS3 = process.env.AWS_S3_DOMAIN

export class S3Service extends BaseService {
  _s3 = new this.aws.S3({ region, accessKeyId, secretAccessKey });

  constructor(file) {
    super();
    
    this._uploadParams = {
      Bucket: bucketName,
      Key: `${accesContext}${new Date().getTime()}${file?.originalname || ""}`,
      Body: file?.buffer,
      };
  }

  uploadFile = async () => {
    try {
      return this._s3.upload(this._uploadParams).promise();
     
  } catch (err) {
      console.log(err);
      throw new this.errors.UploadFileError(err);
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
      const params = { Bucket: bucketName, Key: fileName };
      return this._s3.deleteObject(params).promise();
    } catch (error) {
      throw new this.errors.CustomError("error al borrar el archivo", 404);
    }
  };

}
