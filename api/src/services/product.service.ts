/**
 * Product service related to product crud operation
 * @module utils/product
 */

import { Product } from "../db/entity/Product";
import { IProduct } from "../index.type";
import CategoryService from "./category.service";
import UserService from "./user.service";
import boom from "@hapi/boom";

/**
 * contain all methods related to category services
 * @const
 * @type {CategoryService}
 */
const categoryService = new CategoryService();

/**
 * contain all methods related to product services
 * @const
 * @type {UserService}
 */
const userService = new UserService();

export default class ProductService {
  /**
   * Create a product
   * @async
   * @param {string} userId
   * @param {Omit<IProduct, "id">}
   * @returns {Promise<IProduct>}
   */
  async create(userId: string, data: Omit<IProduct, "id">) {
    const user = await userService.findOne(userId);
    const product = await Product.create(data as Product);

    user.products.push(product);
    user.save();

    return product;
  }

  /**
   * Find all a product
   * @async
   * @returns {Promise<IProduct>}
   */
  async findAll() {
    const product = await Product.find();

    return product;
  }

  /**
   * Find product by id
   * @async
   * @param {string} id product id
   * @returns {Promise<IProduct>}
   */
  async findOne(id: string) {
    const product = await Product.findOneBy({ id });

    if (!product) throw boom.notFound();

    return product;
  }

  /**
   * Update product data
   * @async
   * @param {string} id product id
   * @param {Partial<IProduct>} data to update
   * @returns {Promise<IProduct>}
   */
  async update(id: string, data: Partial<IProduct>) {
    const updatedProduct = await Product.update(id, data);

    if (!updatedProduct) throw boom.notFound();

    return updatedProduct;
  }

  /**
   * Remove product from db
   * @async
   * @param {string} id product id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const product = await this.findOne(id);

    product.remove();

    return true;
  }

  /**
   * Add category to producto
   * @async
   * @param {string} productId
   * @param {string} categoryId
   */
  async addCategory(productId: string, categoryId: string) {
    const product = await this.findOne(productId);
    const category = await categoryService.findOne(categoryId);

    product.categories.push(category);
    product.save();

    return true;
  }
}
