/**
 * Image service related to image crud operation
 * @module utils/image
 */

import { Image } from "../db/entity/Image.entity";
import boom from "@hapi/boom";
import ProductService from "./product.service";
import uploadS3 from "../utils/uploadS3";

/**
 * product service
 * @const
 */
const productService = new ProductService();

export default class CategoryService {
  /**
   * add image to product
   * @async
   * @param data
   * @returns Promise
   */
  async addImageToProduct(productId: string, file: Express.Multer.File) {
    const product = await productService.findOne(productId);

    const rta = await uploadS3(file);

    const image = Image.create();

    image.imageUrl = rta.Location;
    image.size = file.size;
    const newImage = await image.save();

    product?.images.push(newImage);
    const productUpdated = await product.save();

    return productUpdated;
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

    await image.remove();

    return true;
  }
}
