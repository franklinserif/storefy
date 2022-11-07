/**
 * swagger category schemas
 * @module docs/categorySwaggerSchemas
 */

export const categoryCreateSchema = {
  type: "object",
  required: ["name", "image"],
  properties: {
    name: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },
};

export const categoryUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },
};

export const categoryIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
