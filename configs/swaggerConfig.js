const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Veeras Education',
      version: '1.0.0',
      description: 'API documentation for your Express application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
      {
        url: 'https://veeras-api.onrender.com',
        description: 'Stage Server',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js','./routes/admin/*.js'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
