/**
 * swagger review schemas
 * @module docs/reviewSwaggerSchemas
 */

export const reviewCreateSchema = {
  type: "object",
  required: ["comments"],
  properties: {
    comments: {
      type: "string",
    },
  },
};

export const reviewUpdateSchema = {
  type: "object",
  properties: {
    comments: {
      type: "string",
    },
  },
};

export const reviewIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
