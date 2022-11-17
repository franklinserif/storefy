/**
 * swagger variation schemas
 * @module docs/variationSwaggerSchemas
 */

export const variationCreateSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
    },
  },
};

export const variationUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
};
