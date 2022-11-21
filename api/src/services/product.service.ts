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
 */
const userService = new UserService();

export default class ProductService {
  /**
   * Create a product
   * @async
   * @param userId
   * @param data
   * @returns Promise
   */
  async create(userId: string, data: Product) {
    const user = await userService.findOne(userId);
    const product = Product.create(data);

    const newProduct = await product.save();
    user.products.push(product);
    await user.save();

    return newProduct;
  }

  /**
   * Find all a product
   * @async
   * @returns Promise
   */
  async findAll() {
    const product = await Product.find();

    return product;
  }

  /**
   * Find product by id
   * @async
   * @param id product id
   * @returns Promise
   */
  async findOne(id: string) {
    const product = await Product.findOne({
      where: { id },
      relations: [
        "categories",
        "productsModels",
        "reviews",
        "productsRating",
        "categories.children",
      ],
    });

    if (!product) throw boom.notFound();

    return product;
  }

  /**
   * Update product data
   * @async
   * @param id product id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<Omit<IProduct, "productsModels">>) {
    const updatedProduct = await Product.update(id, data);

    if (updatedProduct.affected === 0) throw boom.notFound();

    return { message: "product updated" };
  }

  /**
   * Remove product from db
   * @async
   * @param id product id
   * @returns Promise
   */
  async delete(id: string) {
    const product = await this.findOne(id);

    await product.remove();

    return true;
  }

  /**
   * Add category to producto
   * @async
   * @param productId
   * @param categoryId
   * @returns Promise
   */
  async addCategory(productId: string, categoryId: string) {
    const product = await this.findOne(productId);
    const category = await categoryService.findOne(categoryId);
    const categoryFounded = product.categories.find(
      (category) => category.id === categoryId
    );

    if (categoryFounded)
      throw boom.conflict("this product already have the category");

    product.categories.push(category);
    await product.save();

    return product;
  }

  /**
   * Remove category from product
   * @param productId
   * @param categoryId
   * @returns Promise
   */
  async removeCategory(productId: string, categoryId: string) {
    const product = await this.findOne(productId);

    product.categories = product.categories.filter(
      (category) => category.id !== categoryId
    );

    product.save();

    return product;
  }
}
