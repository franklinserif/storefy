/**
 * swagger user schemas
 * @module docs/userSwaggerSchemas
 */

export const changeUserPasswordSchema = {
  type: "object",
  required: ["code", "email", "password"],
  properties: {
    code: {
      type: "number",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
};

export const confirmCodeUserSchema = {
  type: "object",
  required: ["code", "email"],
  properties: {
    code: {
      type: "number",
    },
    email: {
      type: "string",
    },
  },
};

export const createCodeUserSchema = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
    },
  },
};

export const createUserSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "email",
    "roles",
    "streetNumber",
    "addressLine1",
    "addressLine2",
    "phoneNumber",
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
