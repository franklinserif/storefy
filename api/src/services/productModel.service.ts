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

    const variations = [];

    for (const variation of data.variations) {
      const variationOptionArray = [];
      const newVariation = await variationServide.create({
        name: variation.name,
      });
      await newVariation.save();
      variations.push(newVariation);

      for (const variationOption of variation.values) {
        const newVariationOption = await variationOptionService.create({
          value: variationOption,
        });

        await newVariationOption.save();
        variationOptionArray.push(newVariationOption);
      }

      newVariation.variationOptions = variationOptionArray;
      await newVariation.save();
    }

    productModel.variations = variations;
    await productModel.save();
    product.productsModels.push(productModel);
    const newProductModel = await product.save();

    return newProductModel;
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
    const productModel = await ProductModel.findOne({
      where: { id },
      relations: [
        "variations",
        "variations.variationOptions",
        "shoppingCartItems",
      ],
    });

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

    if (updatedProductModel.affected === 0) throw boom.notFound();

    return { message: "product model updated" };
  }

  /**
   * Remove product model from db
   * @async
   * @param id product model id
   * @returns Promise
   */
  async delete(id: string) {
    const productModel = await this.findOne(id);

    for (const variation of productModel.variations) {
      for (const option of variation.variationOptions) {
        await option.remove();
      }
      await variation.remove();
    }

    await productModel.remove();

    return true;
  }
}
