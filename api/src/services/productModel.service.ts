/**
 * Product model service related to product model crud operation
 * @module utils/productModel
 */

import { ProductModel } from "../db/entity/ProductModel";
import { IProductModel } from "../index.type";
import ProductService from "../services/product.service";
import boom from "@hapi/boom";

/**
 * product service for crud operations
 * @const
 */
const productServide = new ProductService();

export default class ProductModelService {
  /**
   * Create a product model
   * @async
   * @param productId
   * @param data
   * @return Promise
   */
  async create(productId: string, data: Omit<IProductModel, "id">) {
    const product = await productServide.findOne(productId);
    const productModel = new ProductModel();

    productModel.price = data.price;
    productModel.qty = data.qty;

    product.productsModels.push(productModel);
    await product.save();

    for (const size of data.sizes) {
      productModel.sizes.push(size);
    }

    for (const color of data.colors) {
      productModel.sizes.push(color);
    }

    await productModel.save();

    return productModel;
  }

  /**
   * Find all a products models
   * @async
   * @returns Promise
   */
  async findAll() {
    const productsModels = await ProductModel.find();

    return productsModels;
  }

  /**
   * Find product model by id
   * @async
   * @param id product model id
   * @returns Promise
   */
  async findOne(id: string) {
    const productModel = await ProductModel.findOneBy({ id });

    if (!productModel) throw boom.notFound();

    return productModel;
  }

  /**
   * Update product model data
   * @async
   * @param id product model id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IProductModel>) {
    const updatedProductModel = await ProductModel.update(id, data);

    if (!updatedProductModel) throw boom.notFound();

    return updatedProductModel;
  }

  /**
   * Remove product model from db
   * @async
   * @param id product model id
   * @returns Promise
   */
  async delete(id: string) {
    const productModel = await this.findOne(id);

    await productModel.remove();

    return true;
  }
}
