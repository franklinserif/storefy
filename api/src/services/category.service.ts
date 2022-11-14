/**
 * Category service related to category crud operation
 * @module utils/category
 */

import { Category } from "../db/entity/Category";
import { ICategory } from "../index.type";
import boom from "@hapi/boom";

export default class CategoryService {
  /**
   * Create a category
   * @async
   * @param {Omit<ICategory, "id">}
   * @returns {Promise<ICategory>}
   */
  async create(data: Omit<ICategory, "id">) {
    const category = await Category.create(data);

    return category;
  }

  /**
   * Find all a category
   * @async
   * @returns {Promise<ICategory>}
   */
  async findAll() {
    const categories = await Category.find();

    return categories;
  }

  /**
   * Find category by id
   * @async
   * @param {string} id category id
   * @returns {Promise<ICategory>}
   */
  async findOne(id: string) {
    const category = await Category.findOneBy({ id });

    if (!category) throw boom.notFound();

    return category;
  }

  /**
   * Update category data
   * @async
   * @param {string} id category id
   * @param {Partial<ICategory>} data to update
   * @returns {Promise<ICategory>}
   */
  async update(id: string, data: Partial<ICategory>) {
    const updatedCategory = await Category.update(id, data);

    if (!updatedCategory) throw boom.notFound();

    return updatedCategory;
  }

  /**
   * Remove category from db
   * @async
   * @param {string} id category id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const category = await this.findOne(id);

    await category.remove();

    return true;
  }
}
