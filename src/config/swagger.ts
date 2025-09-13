import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Schbang Hotel-Booking APIs",
            version: "1.0.0",
            description: "API docs for Schabang Hotel-Booking App",
        },
        servers: [
            {
                url: process.env.API_BASE_URL || "http://localhost:5000/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token',
                },
            },
            schemas: {
                SignupDto: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", format: "email", example: "john@example.com" },
                        password: { type: "string", minLength: 6, example: "password123" },
                        role: { type: "string", enum: ["admin", "user"], example: "user" }
                    }
                },
                LoginDto: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email", example: "john@example.com" },
                        password: { type: "string", minLength: 6, example: "password123" }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["src/modules/**/*.routes.ts", "src/modules/**/*.dto.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };
