/**
 * swagger payment schemas
 * @module docs/paymentSwaggerSchemas
 */

export const paymentCreateSchema = {
  type: "object",
  required: ["provider", "accountNumber", "expiryDate", "paymentType"],
  properties: {
    provider: {
      type: "string",
    },
    accountNumber: {
      type: "number",
    },
    expiryDate: {
      type: "date",
    },
    paymentType: {
      type: "string",
    },
  },
};

export const paymentUpdateSchema = {
  type: "object",
  properties: {
    provider: {
      type: "string",
    },
    accountNumber: {
      type: "number",
    },
    expiryDate: {
      type: "date",
    },
    paymentType: {
      type: "string",
    },
  },
};

export const paymentIdSchema = {
  type: "object",
  properties: {
    required: ["id"],
    id: {
      type: "string",
    },
  },
};
