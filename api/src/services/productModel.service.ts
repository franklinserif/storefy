/**
 * Product model service related to product model crud operation
 * @module utils/productModel
 */

import { ProductModel } from "../db/entity/ProductModel";
import { IProductModel, IProductModelCreate } from "../index.type";
import ProductService from "../services/product.service";
import VariationService from "./variation.service";
import VariationOptionService from "./variationOption.service";
import boom from "@hapi/boom";

/**
 * product service for crud operations
 * @const
 */
const productServide = new ProductService();

/**
 * variation service for crud operations
 * @const
 */
const variationServide = new VariationService();

/**
 * variation option service for crud operations
 * @const
 */
const variationOptionService = new VariationOptionService();

export default class ProductModelService {
  /**
   * Create a product model
   * @async
   * @param productId
   * @param data
   * @return Promise
   */
  async create(productId: string, data: IProductModelCreate) {
    const product = await productServide.findOne(productId);
    const productModel = new ProductModel();

    productModel.price = data.productModel.price;
    productModel.qty = data.productModel.qty;

    for (const variation of data.variations) {
      const newVariation = await variationServide.create(variation);
      productModel.variations.push(newVariation);

      for (const variationOption of variation.values) {
        const newVariationOption = await variationOptionService.create({
          value: variationOption,
        });
        newVariation.variationOptions.push(newVariationOption);
      }
    }

    product.productsModels.push(productModel);
    await product.save();

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
