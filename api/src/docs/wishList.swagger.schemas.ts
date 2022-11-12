/**
 * swagger wishList schemas
 * @module docs/wishListSwaggerSchemas
 */

export const addOrRemoveProductSchema = {
  type: "object",
  required: ["wishListId", "productId"],
  properties: {
    wishListId: {
      type: "string",
    },
    productId: {
      type: "string",
    },
  },
};
