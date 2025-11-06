# Users & Posts Management Application

A full-stack application for managing users and their posts, built with React (frontend) and Express.js (backend).

## Overview

This is a monorepo containing two interconnected applications:

- **Frontend** (`/frontend`) - React SPA for user interface
- **Backend** (`/backend`) - RESTful API server for data management

The frontend consumes the backend API to provide a complete user and post management system with features like pagination, CRUD operations, and real-time data updates.

## Architecture

### How Frontend and Backend Work Together

```
┌─────────────────┐         HTTP/REST         ┌─────────────────┐
│                 │ ◄──────────────────────► │                 │
│    Frontend     │      API Requests         │     Backend      │
│   (React SPA)   │      (Axios Client)       │  (Express API)   │
│                 │                           │                 │
│  Port: 5173    │                           │  Port: 3001     │
│  (Vite Dev)     │                           │  (Express)      │
└─────────────────┘                           └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   SQLite DB      │
                                              │   (data.db)      │
                                              └─────────────────┘
```

**Key Integration Points:**

1. **API Communication**: Frontend makes HTTP requests to backend endpoints using Axios
2. **CORS Configuration**: Backend is configured to accept requests from the frontend origin
3. **Data Flow**: Frontend → API Client → Backend → Database → Backend → Frontend
4. **State Management**: Frontend uses React Query to cache and manage server state
5. **Error Handling**: Consistent error response format between frontend and backend

### Data Flow

1. **User Action** → Frontend component triggers an action
2. **API Call** → React Query hook calls the API client
3. **HTTP Request** → Axios sends request to backend endpoint
4. **Backend Processing** → Express routes handle request, validate, query database
5. **Response** → Backend returns JSON response
6. **State Update** → React Query updates frontend state and UI

## Quick Start

### Prerequisites

- **Node.js**: v18+ (recommended: v20+)
- **npm**: v9+

### Running the Full Stack

**⚠️ Important**: Always start the backend first, then the frontend.

1. **Start the Backend:**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Backend will run on `http://localhost:3001`

2. **Start the Frontend** (in a new terminal):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend will run on `http://localhost:5173` (or next available port)

3. **Access the Application:**

   Open `http://localhost:5173` in your browser

### Environment Configuration

**Backend:**

- Configuration in `backend/config/default.json`
- Default port: `3001`
- Database path: `./data.db`

**Frontend:**

- Create `frontend/.env` file:
  ```env
  VITE_API_URL=http://localhost:3001
  ```
- This tells the frontend where to find the backend API

## Project Structure

```
.
├── backend/          # Express.js API server
│   ├── src/         # Source code
│   ├── config/      # Configuration files
│   └── README.md    # Detailed backend documentation
│
├── frontend/         # React application
│   ├── src/         # Source code
│   └── README.md    # Detailed frontend documentation
│
└── README.md         # This file
```

## Development

### Running Tests

**Backend Tests:**

```bash
cd backend
npm test
```

**Frontend Tests:**

```bash
cd frontend
npm test              # Unit tests (Vitest)
npm run test:cy       # Component tests (Cypress)
```

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/` (ready for deployment to Netlify or similar)

## Technology Stack

### Frontend

- React 19, TypeScript, Vite
- TanStack React Query (server state)
- React Router (routing)
- Tailwind CSS (styling)
- Axios (HTTP client)

### Backend

- Node.js, Express.js, TypeScript
- SQLite3 (database)
- Jest + Supertest (testing)

## Documentation

For detailed information about each application:

- **[Frontend Documentation](./frontend/README.md)** - React app architecture, features, and setup
- **[Backend Documentation](./backend/README.md)** - API architecture, endpoints, and setup

## Key Features

- **User Management**: Browse paginated list of users with addresses
- **Post Management**: View, create, and delete posts per user
- **Real-time Updates**: Optimistic UI updates with React Query
- **Type Safety**: Full TypeScript across frontend and backend
- **Error Handling**: Consistent error handling and user feedback
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
