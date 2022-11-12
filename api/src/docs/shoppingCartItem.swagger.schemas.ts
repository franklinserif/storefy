/**
 * swagger shopping cart item schemas
 * @module docs/shoppingCartItemSwaggerSchemas
 */

export const shoppingCartItemCreateSchema = {
  type: "object",
  required: ["qty", "productId", "shoppinCartItem", "price", "size", "color"],
  properties: {
    qty: {
      type: "number",
    },
    productId: {
      type: "string",
    },
    shoppingCartId: {
      type: "string",
    },
    price: {
      type: "number",
    },
    size: {
      type: "string",
    },
    color: {
      type: "string",
    },
  },
};

export const shoppingCartItemUpdateSchema = {
  type: "object",
  properties: {
    qty: {
      type: "number",
    },
    productId: {
      type: "string",
    },
    shoppingCartId: {
      type: "string",
    },
    price: {
      type: "number",
    },
    size: {
      type: "string",
    },
    color: {
      type: "string",
    },
  },
};

export const shoppingCartItemIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
