/**
 * swagger variation option schemas
 * @module docs/variationOptionSwaggerSchemas
 */

export const variationOptionCreateSchema = {
  type: "object",
  required: ["value"],
  properties: {
    value: {
      type: "string",
    },
  },
};

export const variationOptionUpdateSchema = {
  type: "object",
  properties: {
    value: {
      type: "string",
    },
  },
};
