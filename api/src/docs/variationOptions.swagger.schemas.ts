/**
 * swagger variation options schemas
 * @module docs/variationOptionsSwaggerSchemas
 */

export const variationOptionsCreateSchema = {
  type: "object",
  required: ["value", "number"],
  properties: {
    value: {
      type: "string",
    },
    qty: {
      type: "number",
    },
  },
};

export const variationOptionsUpdateSchema = {
  type: "object",
  properties: {
    value: {
      type: "string",
    },
    qty: {
      type: "number",
    },
  },
};

export const variationOptionsIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
