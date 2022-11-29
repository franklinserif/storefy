/**
 * Category service related to category crud operation
 * @module utils/category
 */

import { AppDataSource } from "../data-source";
import { Category } from "../db/entity/Category.entity";
import { ICategory } from "../index.type";
import { uploadS3 } from "../utils/S3";
import boom from "@hapi/boom";

export default class CategoryService {
  /**
   * Create a category
   * @async
   * @param data
   * @returns Promise
   */
  async create(data: Omit<ICategory, "id">) {
    const category = Category.create(data);

    await category.save();

    return category;
  }

  /**
   * Find all a categories
   * @async
   * @returns Promise
   */
  async findAll() {
    const categories = await Category.find();

    return categories;
  }

  /**
   * Find a category by id
   * @async
   * @param id category id
   * @throws error not found
   * @returns Promise
   */
  async findOne(id: string) {
    const category = await Category.findOne({
      where: { id },
      relations: ["children", "promotion"],
    });

    if (!category) throw boom.notFound();

    return category;
  }

  /**
   * Update category data in db
   * @async
   * @param id category id
   * @param data to update
   * @throws error not found
   * @returns Promise
   */
  async update(id: string, data: Partial<ICategory>) {
    const updatedCategory = await Category.update(id, data);

    if (!updatedCategory) throw boom.notFound();

    return { message: "category updated" };
  }

  /**
   * Remove category from db
   * @async
   * @param id category id
   * @throws error not found
   * @returns Promise
   */
  async delete(id: string) {
    const rta = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();

    if (rta.affected === 0) throw boom.notFound();

    return true;
  }

  /**
   * add a category as a children of another category
   * @param parentCategoryId
   * @param childCategoryId
   * @returns Promise
   */
  async addParentCategory(parentCategoryId: string, childCategoryId: string) {
    const parentCategory = await this.findOne(parentCategoryId);

    const chilrenFounded = parentCategory.children.find(
      (category) => category.id === childCategoryId
    );
    if (chilrenFounded)
      throw boom.conflict("category is already added to this parent");

    const childCategory = await this.findOne(childCategoryId);

    parentCategory.children.push(childCategory);
    await parentCategory.save();

    return parentCategory;
  }

  /**
   * remove a category as a children of another category
   * @param parentCategoryId
   * @param childCategoryId
   * @returns
   */
  async removeParentCategory(
    parentCategoryId: string,
    childCategoryId: string
  ) {
    const parentCategory = await this.findOne(parentCategoryId);

    parentCategory.children = parentCategory.children.filter(
      (category) => category.id !== childCategoryId
    );

    parentCategory.children.forEach((item) => console.log(item));
    await parentCategory.save();

    return parentCategory;
  }

  /**
   * upload image to s3
   * @param id
   * @param file
   * @returns
   */
  async addImage(id: string, file: Express.Multer.File) {
    const category = await this.findOne(id);
    const rta = await uploadS3(file);

    category.image = rta.Location;

    const categoryUpdated = await category.save();

    return categoryUpdated;
  }
}
