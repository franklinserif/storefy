/**
 * upload file to aws s3
 * @module utils/uploadS3
 */

import fs from "fs";
import S3 from "aws-sdk/clients/s3";
import CONFIG from "../config";

const s3 = new S3({
  region: CONFIG.AWS_BUCKET_REGION,
  accessKeyId: CONFIG.AWS_ACCESS_KEY,
  secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
});

/**
 * upload file to s3
 * @param file
 * @returns Promise
 */
export const uploadS3 = (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);
  fs.unlinkSync(file.path);

  const uploadParams = {
    Bucket: CONFIG.AWS_BUCKET_NAME as string,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

/**
 * Delete image from aws s3
 * @param filename
 * @returns
 */
export const deleteImageFromS3 = (filename: string) => {
  const params = { Bucket: CONFIG.AWS_BUCKET_NAME as string, Key: filename };

  return s3.deleteObject(params).promise();
};
