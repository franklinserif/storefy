/**
 * swagger product rating schemas
 * @module docs/productRatingSwaggerSchemas
 */

export const productRatingCreateSchema = {
  type: "object",
  required: ["rating"],
  properties: {
    rating: {
      type: "number",
    },
  },
};

export const productRatingUpdateSchema = {
  type: "object",
  properties: {
    rating: {
      type: "number",
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
