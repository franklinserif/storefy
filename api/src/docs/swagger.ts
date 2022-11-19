import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import {
  createUserSchema,
  userUpdateSchema,
  userIdSchema,
} from "./user.swagger.schemas";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdSchema,
  addOrRemoveCategorySchema,
} from "./category.swagger.shemas";
import {
  paymentCreateSchema,
  paymentUpdateSchema,
  paymentIdSchema,
} from "./payment.swagger.schemas";

import {
  productRatingCreateSchema,
  productRatingUpdateSchema,
  productRatingIdSchema,
} from "./productRating.swagger.schemas";

import {
  promotionCreateSchema,
  promotionUpdateSchema,
  promotionIdSchema,
} from "./promotion.swagger.schemas";

import {
  reviewCreateSchema,
  reviewUpdateSchema,
  reviewIdSchema,
} from "./review.swagger.schemas";

import {
  shoppingCartCreateSchema,
  shoppingCartUpdateSchema,
  shoppingCartIdSchema,
} from "./shoppingCart.swagger.schemas";

import {
  shoppingCartItemCreateSchema,
  shoppingCartItemUpdateSchema,
  shoppingCartItemIdSchema,
} from "./shoppingCartItem.swagger.schemas";

import {
  productCreateSchema,
  productUpdateSchema,
  productIdSchema,
} from "./product.swagger.schemas";

import {
  variationCreateSchema,
  variationUpdateSchema,
} from "./variation.swagger.schemas";

import {
  variationOptionCreateSchema,
  variationOptionUpdateSchema,
} from "./variationOption.swagger.schemas";

import { addOrRemoveProductSchema } from "./wishList.swagger.schemas";

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
      productCreateSchema,
      productUpdateSchema,
      productIdSchema,
      createUserSchema,
      userUpdateSchema,
      userIdSchema,
      categoryCreateSchema,
      categoryUpdateSchema,
      categoryIdSchema,
      paymentCreateSchema,
      paymentUpdateSchema,
      paymentIdSchema,
      productRatingCreateSchema,
      productRatingUpdateSchema,
      productRatingIdSchema,
      promotionCreateSchema,
      promotionUpdateSchema,
      promotionIdSchema,
      reviewCreateSchema,
      reviewUpdateSchema,
      reviewIdSchema,
      shoppingCartCreateSchema,
      shoppingCartUpdateSchema,
      shoppingCartIdSchema,
      shoppingCartItemCreateSchema,
      shoppingCartItemUpdateSchema,
      shoppingCartItemIdSchema,
      addOrRemoveProductSchema,
      variationCreateSchema,
      variationUpdateSchema,
      variationOptionCreateSchema,
      variationOptionUpdateSchema,
      addOrRemoveCategorySchema,

      /*   createUserSchema: {
        type: "object",
        required: [
          "firstName",
          "lastName",
          "email",
          "password",
          "roles",
          "streetNumber",
        ],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      }, */
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
