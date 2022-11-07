/**
 * swagger shopping cart schemas
 * @module docs/shoppingCartSwaggerSchemas
 */

export const shoppingCartCreateSchema = {
  type: "object",
  required: ["qty"],
  properties: {
    qty: {
      type: "number",
    },
  },
};

export const shoppingCartUpdateSchema = {
  type: "object",
  properties: {
    qty: {
      type: "number",
    },
  },
};

export const shoppingCartIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
