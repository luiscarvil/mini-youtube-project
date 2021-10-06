import aws from "aws-sdk";
import { BaseService } from "./base.service.js";

// TODO add security credential (upload files) configure bucket credentials
export class S3Service extends BaseService {
  _s3 = new aws.S3({ region: process.env.AWS_SE_REGION });
  constructor(file) {
    super();
    this._uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${process.env.AWS_S3_CONTEXT}${new Date().getTime()}${
        file?.originalname || ""
      }`,
      Body: file?.buffer,
      ACL: "public-read",
    };
  }

  upload = async () => {
    try {
      const data = await this._putObject();
      const fileName = this._uploadParams.Key.replace(/\s/g, "%20");

      return {
        query: this._uploadParams,
        response: data,
        url: `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_S3_DOMAIN}/${fileName}`,
        fileName: this._uploadParams.Key,
      };
    } catch (err) {
      throw new this.errors.UploadFileError(err);
    }
  };

  /**
   * delete file from aws s3 by file name
   * @param {} fileName
   */
  delete = async (fileName) => {
      try{
    const params = { Bucket: process.env.AWS_S3_BUCKET, Key: fileName };
    return this._s3.deleteObject(params).promise();
      }catch(error){
          throw new this.errors.CustomError("error al borrar el archivo", 404)
      }
  };

  _putObject = async () => {
    return this._s3.putObject(this._uploadParams).promise();
  };
}
