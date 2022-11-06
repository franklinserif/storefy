import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Storefy API documentation",
    version: "1.0.0",
    description:
      "Storefy backend api, this is the main docs for the storefy server api, it contains all the information to connect to the api, all endpoints and schemas",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        schema: "bearer",
      },
    },
    schemas: {
      signinUserSchema: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
