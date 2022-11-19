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
   * @param data
   * @returns Promise
   */
  async create(data: Omit<ICategory, "id">) {
    const category = await Category.create(data);

    return category;
  }

  /**
   * Find all a category
   * @async
   * @returns Promise
   */
  async findAll() {
    const categories = await Category.find();

    return categories;
  }

  /**
   * Find category by id
   * @async
   * @param id category id
   * @throws error not found
   * @returns Promise
   */
  async findOne(id: string) {
    const category = await Category.findOneBy({ id });

    if (!category) throw boom.notFound();

    return category;
  }

  /**
   * Update category data
   * @async
   * @param id category id
   * @param data to update
   * @throws error not found
   * @returns Promise
   */
  async update(id: string, data: Partial<ICategory>) {
    const updatedCategory = await Category.update(id, data);

    if (!updatedCategory) throw boom.notFound();

    return updatedCategory;
  }

  /**
   * Remove category from db
   * @async
   * @param id category id
   * @throws error not found
   * @returns Promise
   */
  async delete(id: string) {
    const category = await this.findOne(id);

    await category.remove();

    return true;
  }
}
