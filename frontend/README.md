# Frontend Application

A modern React application for managing users and their posts, built with TypeScript, React Query, and Vite.

## Overview

This is a single-page application (SPA) that provides a user management interface with the following capabilities:

- **Users Management**: Browse paginated list of users with their contact information and addresses
- **Posts Management**: View, create, and delete posts for individual users
- **Real-time Data**: Optimistic updates and efficient caching with React Query

## Architecture

### Features Layer

The application follows a **feature-based architecture** where each feature is self-contained:

```
src/features/users/
├── components/      # UI components (Table, PostCard, CreatePost, etc.)
├── hooks/          # Custom React hooks (useUsersTableQuery, useCreatePostMutation, etc.)
├── pages/          # Page components (UsersPage, UserPostsPage)
├── services/       # Business logic layer (UserService)
├── dataSources/    # API integration layer (UsersApiDataSource)
├── schemas/        # Zod validation schemas
└── types.ts        # TypeScript type definitions
```

**Key Features:**

- **Users Table**: Paginated table displaying user information with search and navigation
- **User Posts**: Individual post management per user with CRUD operations
- **Form Validation**: Client-side validation using Zod schemas
- **Error Handling**: Comprehensive error states and retry mechanisms

### Application Layer

The app layer (`src/app/`) handles routing, layout, and global providers:

- **Routing**: React Router v7 with client-side routing

  - `/users` - Users table page
  - `/post/:userId` - User posts page
  - `/*` - 404 Not Found handler

- **Providers**: Global context providers

  - `QueryClientProvider`: TanStack Query for server state management
  - `RouterProvider`: React Router configuration

- **Layout**: Root layout with error boundaries and navigation

### API Client & Infrastructure

**API Client Architecture:**

```
lib/apiClient/
├── base.ts              # Base interfaces and factory types
├── axios/
│   ├── factory.ts       # Axios client factory
│   ├── interceptors/    # Request/response interceptors
│   └── index.ts         # Configured API client instance
└── index.ts             # Public API
```

**Key Features:**

- **Abstracted API Client**: Factory pattern allows swapping HTTP clients
- **Axios Integration**: Currently using Axios with interceptors
- **Request/Response Interceptors**: Centralized request/response handling
- **Type-Safe**: Full TypeScript support with generic types

**Data Flow:**

1. **DataSource** (`UsersApiDataSource`) - Makes HTTP calls via API client
2. **Service** (`UserService`) - Business logic and data transformation
3. **Hooks** - React Query hooks for data fetching and mutations
4. **Components** - UI components consuming hooks

### State Management

- **Server State**: TanStack React Query v5

  - Automatic caching and refetching
  - Optimistic updates for mutations
  - Query invalidation strategies

- **Client State**: React hooks (useState)
  - Form state management
  - UI state (modals, loading states)

### Shared Components

Reusable UI components in `src/shared/components/`:

- `Button`, `Input`, `Textarea` - Form controls
- `Modal` - Modal dialogs
- `Loader` - Loading indicators
- `Typography` - Text components
- `PageLayout` - Page container layout

## Tooling

### Code Quality

- **ESLint 9**: Code linting with TypeScript and React plugins

  - Flat config format
  - React Hooks rules
  - TypeScript ESLint integration
  - TanStack Query plugin

- **Husky**: Git hooks for pre-commit checks
  - Configured at root level
  - CI-aware (skips in CI environments)

### Styling

- **Tailwind CSS 3.4**: Utility-first CSS framework
  - Custom theme configuration
  - Custom colors (primary, faded, text)
  - Responsive design utilities
  - PostCSS with Autoprefixer

### Build & Deployment

- **Build**: TypeScript compilation + Vite bundling
- **Output**: Static files in `dist/` directory
- **Netlify**: Configured for deployment with SPA redirects
  - Redirects file in `public/_redirects`
  - Build command: `npm run build`
  - Publish directory: `dist`

## Testing Setup

### Unit & Integration Tests

**Vitest 4** - Fast unit testing framework

- **Environment**: jsdom for DOM simulation
- **Test Files**: `src/**/*.test.ts`
- **Coverage**: Configurable coverage reporting
- **Setup**: `src/setupTests.ts` with Testing Library matchers

**Testing Library** - React component testing

- `@testing-library/react` - Component rendering utilities
- `@testing-library/jest-dom` - Custom matchers

### Component Tests

**Cypress 15** - Component testing

- **Framework**: React with Vite bundler
- **Test Files**: `src/**/*.cy.tsx`
- **Pattern**: Component-level testing in isolation

### Test Scripts

```bash
npm test              # Run Vitest in watch mode
npm run test:cy       # Run Cypress component tests
```

## Setup Instructions

### Prerequisites

- **Node.js**: v18+ (recommended: v20+)
- **npm**: v9+ (comes with Node.js)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `frontend/` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Replace with your backend API URL.

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the next available port).

### Available Scripts

```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm test             # Run Vitest tests
npm run test:cy      # Run Cypress component tests
npm run test:all     # Run all test suites
```

### Development Workflow

1. **Start the backend server** (if running locally)
2. **Set `VITE_API_URL`** in `.env` to point to your backend
3. **Run `npm run dev`** to start the frontend
4. **Make changes** - Hot Module Replacement (HMR) will update automatically
5. **Run tests** - Use `npm test` for unit tests or `npm run test:cy` for component tests

### Project Structure

```
frontend/
├── public/              # Static assets (copied to dist/)
│   └── _redirects      # Netlify SPA redirects
├── src/
│   ├── app/            # Application layer (routing, providers, layout)
│   ├── features/       # Feature modules
│   │   └── users/      # Users feature
│   ├── lib/            # Shared libraries (API client, utilities)
│   ├── shared/         # Shared components and utilities
│   └── main.tsx        # Application entry point
├── cypress/            # Cypress configuration
├── dist/               # Production build output (gitignored)
└── package.json        # Dependencies and scripts
```

## Environment Variables

| Variable       | Description          | Required |
| -------------- | -------------------- | -------- |
| `VITE_API_URL` | Backend API base URL | Yes      |
