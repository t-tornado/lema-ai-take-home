# Backend API

A RESTful API server built with Express.js and SQLite, providing endpoints for user and post management.

## Overview

This is a Node.js backend API that serves as the data layer for the frontend application. It provides:

- **Users Management**: CRUD operations for users with address information
- **Posts Management**: Create, read, and delete posts associated with users
- **Pagination**: Efficient pagination support for large datasets
- **Data Validation**: Request validation and error handling middleware
- **Type Safety**: Full TypeScript implementation

### Relationship with Frontend

**Important**: When running the full application stack, always start the backend server first, then start the frontend. The frontend will fail to load data if the backend is not running.

## Architecture

### Application Structure

The backend follows a **layered architecture** pattern:

```
src/
├── index.ts              # Application entry point and Express setup
├── routes/               # Route handlers (REST endpoints)
│   ├── users.ts         # User-related endpoints
│   └── posts.ts         # Post-related endpoints
├── db/                   # Database layer
│   ├── connection.ts    # SQLite database connection
│   ├── users/           # User data access layer
│   │   ├── users.ts     # User database operations
│   │   ├── query-templates.ts  # SQL query templates
│   │   └── types.ts     # User-related TypeScript types
│   └── posts/           # Post data access layer
│       ├── posts.ts     # Post database operations
│       ├── query-templates.ts  # SQL query templates
│       └── types.ts     # Post-related TypeScript types
├── middlewares/         # Express middleware
│   ├── createIdValidatorMiddleware.ts    # ID validation middleware factory
│   ├── getUsersParamValidator.ts         # Query parameter validation
│   └── validateCreatePostPayloadMiddleware.ts  # Post payload validation
├── utils/               # Utility functions
│   └── idHelper.ts     # ID generation and validation
├── types.ts            # Shared TypeScript types
└── tests/              # Test files
    └── posts.test.ts   # Integration tests
```

### Error Handling

**Structured Error Responses** - Consistent error format across all endpoints:

```typescript
{
  errors: [
    {
      type: "validation" | "not_found" | "internal_server_error",
      field: "field_name",
      code: "error_code",
      message: "Human-readable error message",
    },
  ];
}
```

**Error Types:**

- `ValidationError` - Invalid input data
- `NotFoundError` - Resource not found (404)
- `InternalServerError` - Server-side errors (500)

## Setup Instructions

### Prerequisites

- **Node.js**: v18+ (recommended: v20+)
- **npm**: v9+ (comes with Node.js)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Database Setup:**

   The application uses SQLite with a database file at `./data.db`. Ensure the database file exists and contains the required tables:

   - `users` - User information
   - `addresses` - User addresses
   - `posts` - User posts

   If the database doesn't exist, create it with the appropriate schema.

3. **Configure the application:**

   Edit `config/default.json` to set your configuration:

   ```json
   {
     "port": 3001,
     "dbPath": "./data.db"
   }
   ```

   Or use environment-specific config files (e.g., `config/development.json`, `config/production.json`).

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001` (or your configured port).

   **⚠️ Important**: This backend server **must be started before** starting the frontend application. The frontend depends on this API to function properly locally.

### Available Scripts

```bash
npm run dev          # Start development server with nodemon (auto-restart)
npm run start            # Start production server (requires build first)
npm run test             # Run tests with Jest
```

### Development Workflow

2. **Start the backend server** - Run `npm run dev` to start the development server
   - **Note**: The backend must be running before starting the frontend
3. **Start the frontend** (in a separate terminal) - Navigate to the `frontend/` directory and run `npm run dev`
4. **Make changes** - Nodemon will automatically restart the server
5. **Test endpoints** - Use tools like Postman, curl, or the frontend app
6. **Run tests** - Use `npm test` to verify functionality
