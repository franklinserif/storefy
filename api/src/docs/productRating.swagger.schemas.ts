/**
 * swagger product rating schemas
 * @module docs/productRatingSwaggerSchemas
 */

export const productRatingCreateSchema = {
  type: "object",
  required: ["rating", "productId", "userId"],
  properties: {
    rating: {
      type: "number",
    },
    productId: {
      type: "string",
    },
    userId: {
      type: "string",
    },
  },
};

export const productRatingUpdateSchema = {
  type: "object",
  properties: {
    rating: {
      type: "number",
    },
    productId: {
      type: "string",
    },
    userId: {
      type: "string",
    },
  },
};

export const productRatingIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
