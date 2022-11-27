/**
 * Image service related to image crud operation
 * @module utils/image
 */

import { Image } from "../db/entity/Image.entity";
import { IImage } from "../index.type";
import boom from "@hapi/boom";
import ProductService from "./product.service";

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
  async addImageToProduct(productId: string, data: Omit<IImage, "id">) {
    const product = await productService.findOne(productId);
    const image = Image.create(data as Image);

    const newImage = await image.save();
    await product?.images.push(image);

    return newImage;
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
