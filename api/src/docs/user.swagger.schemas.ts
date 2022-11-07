/**
 * swagger user schemas
 * @module docs/userSwaggerSchemas
 */

export const createUserSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "roles",
    "phoneNumber",
    "streetNumber",
    "addressLine1",
    "addressLine2",
    "city",
    "region",
    "postalCode",
  ],
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    roles: {
      type: "string",
    },
    streetNumber: {
      type: "string",
    },
    addressLine1: {
      type: "string",
    },
    addressLine2: {
      type: "string",
    },

    phoneNumber: {
      type: "string",
    },
    city: {
      type: "string",
    },
    region: {
      type: "string",
    },
    postalCode: {
      type: "string",
    },
  },
};

export const userUpdateSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    roles: {
      type: "string",
    },
    streetNumber: {
      type: "string",
    },
    addressLine1: {
      type: "string",
    },
    addressLine2: {
      type: "string",
    },

    phoneNumber: {
      type: "string",
    },
    city: {
      type: "string",
    },
    region: {
      type: "string",
    },
    postalCode: {
      type: "string",
    },
  },
};

export const userIdSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
    },
  },
};
