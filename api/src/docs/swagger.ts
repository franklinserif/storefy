import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import {
  userCreateSchemaSwagger,
  userUpdateSchemaSwagger,
  userIdSchemaSwagger,
  userEmailSchemaSwagger,
  userConfirmCodeSchemaSwagger,
  userChangePasswordSchemaSwagger,
  userSigninSwagger,
} from "../schemas/userSchemas";
import {
  productModelCreateSchemaSwagger,
  productModelUpdateSchemaSwagger,
  productModelIdSchemaSwagger,
} from "../schemas/ProductModelSchemas";
import {
  categoryCreateSchemaSwagger,
  categoryUpdateSchemaSwagger,
  categoryIdSchemaSwagger,
  addOrRemoveCategoryParentSwagger,
} from "../schemas/categorySchemas";
import { paymentUpdateSchemaSwagger } from "../schemas/paymentSchemas";

import {
  productRatingCreateSchemaSwagger,
  productRatingUpdateSchemaSwagger,
  productRatingIdSchemaSwagger,
} from "../schemas/productRatingSchemas";

import {
  promotionCreateSchemaSwagger,
  promotionUpdateSchemaSwagger,
  promotionIdSchemaSwagger,
} from "../schemas/promotionSchemas";

import {
  reviewCreateSchemaSwagger,
  reviewUpdateSchemaSwagger,
} from "../schemas/reviewSchemas";

import {
  shoppingCartCreateSchemaSwagger,
  shoppingCartUpdateSchemaSwagger,
  shoppingCartIdSchemaSwagger,
} from "../schemas/shoppingCartSchemas";

import {
  shoppinCartItemCreateSchemaSwagger,
  shoppinCartItemUpdateSchemaSwagger,
  shoppinCartItemIdSchemaSwagger,
} from "../schemas/shoppingCartItemSchemas";

import {
  productCreateSchemaSwagger,
  productUpdateSchemaSwagger,
  productIdSchemaSwagger,
} from "../schemas/productSchemas";

import {
  variationOptionCreateSchemaSwagger,
  variationOptionUpdateSchemaSwagger,
  variationOptionIdSchemaSwagger,
} from "../schemas/variationOptionSchemas";

import {
  variationCreateSchemaSwagger,
  variationUpdateSchemaSwagger,
  variationIdSchemaSwagger,
} from "../schemas/variationSchemas";

import {
  addOrRemoveProductWishListSchemaSwagger,
  wishListIdSchemaSwagger,
} from "../schemas/wishList.schemas";

import {
  createImageSchemaSwagger,
  updateImageSchemaSwagger,
  idImageSchemaSwagger,
} from "../schemas/image.schemas";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Storefy API documentation",
    version: "1.0.0",
    description:
      "Storefy backend api, this is the main docs for the storefy server api, it contains all the information to connect to the api, all endpoints and schemas",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        schema: "bearer",
      },
    },
    schemas: {
      userCreateSchemaSwagger,
      userUpdateSchemaSwagger,
      userIdSchemaSwagger,
      userEmailSchemaSwagger,
      userConfirmCodeSchemaSwagger,
      userSigninSwagger,
      userChangePasswordSchemaSwagger,
      productModelCreateSchemaSwagger,
      productModelUpdateSchemaSwagger,
      productModelIdSchemaSwagger,
      categoryCreateSchemaSwagger,
      categoryUpdateSchemaSwagger,
      categoryIdSchemaSwagger,
      addOrRemoveCategoryParentSwagger,
      paymentUpdateSchemaSwagger,
      productRatingCreateSchemaSwagger,
      productRatingUpdateSchemaSwagger,
      productRatingIdSchemaSwagger,
      promotionCreateSchemaSwagger,
      promotionUpdateSchemaSwagger,
      promotionIdSchemaSwagger,
      reviewCreateSchemaSwagger,
      reviewUpdateSchemaSwagger,
      shoppingCartCreateSchemaSwagger,
      shoppingCartUpdateSchemaSwagger,
      shoppingCartIdSchemaSwagger,
      shoppinCartItemCreateSchemaSwagger,
      shoppinCartItemUpdateSchemaSwagger,
      shoppinCartItemIdSchemaSwagger,
      productCreateSchemaSwagger,
      productUpdateSchemaSwagger,
      productIdSchemaSwagger,
      variationOptionCreateSchemaSwagger,
      variationOptionUpdateSchemaSwagger,
      variationOptionIdSchemaSwagger,
      variationCreateSchemaSwagger,
      variationUpdateSchemaSwagger,
      variationIdSchemaSwagger,
      addOrRemoveProductWishListSchemaSwagger,
      wishListIdSchemaSwagger,
      createImageSchemaSwagger,
      updateImageSchemaSwagger,
      idImageSchemaSwagger,
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
