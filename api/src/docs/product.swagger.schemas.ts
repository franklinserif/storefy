/**
 * swagger product schemas
 * @module docs/productSwaggerSchemas
 */

export const productCreateSchema = {
  type: "object",
  required: ["name", "description", "price", "sizes", "colors"],
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    sizes: {
      type: "array",
      items: "string",
    },
    colors: {
      type: "array",
      items: "string",
    },
  },
};

export const productUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    sizes: {
      type: "array",
      items: "string",
    },
    colors: {
      type: "array",
      items: "string",
    },
  },
};

export const productIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
