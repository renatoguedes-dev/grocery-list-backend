# Grocery List Backend

This is the backend for a Grocery List application, providing APIs for user authentication, inventory management, and shopping list creation.

<p float="left" style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
  <img src="src\assets\images\projectpic1.png" alt="list section's picture" style="width: 350px; max-width: 350px; max-height: 530px">
  <img src="src\assets\images\projectpic2.png" alt="list detailed's picture" style="width: 350px; max-width: 350px; max-height: 530px">
</p>

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)
- bcryptjs
- Express Validator
- Helmet

## Features

- **User Authentication**: Sign up and login functionality with JWT-based authentication.
- **Inventory Management**: CRUD operations for managing grocery inventory.
- **Shopping Lists**: Create, read, update, and delete shopping lists and list items.
- **Profile Management**: User profile updates and password changes.
- **Input Validation**: Request validation using Express Validator.
- **Error Handling**: Centralized error handling middleware.
- **Security**: Implementation of security best practices using Helmet.

## Deployment

The full project is deployed using Netlify, Render and Neon. You can view the live demo [here](https://grocery-planner.netlify.app/).

## Project Structure

- `src/app.ts`: Main application file
- `src/routes/`: API route definitions
- `src/controllers/`: Request handlers for each route
- `src/services/`: Business logic layer
- `src/repositories/`: Data access layer
- `src/middleware/`: Custom middleware (e.g., authentication, error handling)
- `src/schemas/`: Request validation schemas
- `src/errors/`: Custom error classes
- `prisma/`: Prisma ORM schema and migrations

## API Endpoints

- `/api/signup`: User registration
- `/api/login`: User authentication
- `/api/lists`: Shopping list management (protected)
- `/api/inventory`: Inventory management (protected)
- `/api/profile`: User profile management (protected)

## Security

This project implements several security measures:

- Password hashing using bcryptjs
- JWT-based authentication
- Input validation and sanitization
- HTTP security headers with Helmet

## Database

The project uses PostgreSQL as the database, with Prisma as the ORM. The database schema includes tables for users, inventory items, shopping lists, and list items.

## Error Handling

The application includes a centralized error handling middleware that catches and formats errors consistently across the API.

## Validation

Request validation is implemented using Express Validator, with custom validation schemas for each endpoint.

## Future Improvements

- Implement refresh tokens for enhanced security
- Add unit and integration tests
- Set up CI/CD pipeline
- Implement rate limiting and other advanced security measures