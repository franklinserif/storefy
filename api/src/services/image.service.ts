/**
 * Image service related to image crud operation
 * @module services/image
 */

import { Image } from "../db/entity/Image.entity";
import boom from "@hapi/boom";
import ProductModelService from "./productModel.service";
import { uploadS3, deleteImageFromS3 } from "../utils/S3";

/**
 * product service
 * @const
 */
const productModelService = new ProductModelService();

export default class ImageService {
  /**
   * add image to product
   * @async
   * @param productId
   * @param file
   * @returns Promise
   */
  async addImageToProduct(productId: string, file: Express.Multer.File) {
    const productModel = await productModelService.findOne(productId);

    const rta = await uploadS3(file);

    const image = Image.create();
    image.imageUrl = rta.Location;
    image.size = file.size;
    image.name = file.originalname;
    const newImage = await image.save();

    productModel.images.push(newImage);

    const productModelUpdated = await productModel.save();

    return productModelUpdated;
  }

  /**
   * Remove category from db
   * @async
   * @param id category id
   * @throws error not found
   * @returns Promise
   */
  async delete(id: string) {
    const image = await Image.findOne({ where: { id } });

    if (!image) throw boom.notFound("image doesn't exist");

    const rta = await deleteImageFromS3(image.name);

    if (!rta) throw boom.conflict("there is a problem deleting the image");

    await image.remove();

    return true;
  }
}
