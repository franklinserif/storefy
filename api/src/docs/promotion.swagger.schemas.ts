/**
 * swagger promotion schemas
 * @module docs/promotionSwaggerSchemas
 */

export const promotionCreateSchema = {
  type: "object",
  required: ["name", "description", "discountRate", "startDate", "endDate"],
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    discountRate: {
      type: "number",
    },
    startDate: {
      type: "date",
    },
    endDate: {
      type: "date",
    },
  },
};

export const promotionUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    discountRate: {
      type: "number",
    },
    startDate: {
      type: "date",
    },
    endDate: {
      type: "date",
    },
  },
};

export const promotionIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
