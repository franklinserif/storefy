/**
 * swagger shopping cart item schemas
 * @module docs/shoppingCartItemSwaggerSchemas
 */

export const shoppingCartItemCreateSchema = {
  type: "object",
  required: ["qty"],
  properties: {
    qty: {
      type: "number",
    },
  },
};

export const shoppingCartItemUpdateSchema = {
  type: "object",
  properties: {
    qty: {
      type: "number",
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
