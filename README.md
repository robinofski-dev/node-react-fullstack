# node-react-fullstack

A full-stack TypeScript application with GitHub OAuth authentication, built as a monorepo using npm workspaces. Used as a based for a Digital Banking Summit web app demo.

This Readme provides an overview of the project structure, technologies used, and instructions to get it up and running locally. There will be other markdown files diving deeper into specific implementation details.

## The Challenge

The goal was to scaffold a production-ready project structure from scratch that satisfies the following requirements:

- **Full-stack TypeScript** — types should be shared between the backend and frontend, avoiding duplication and keeping API contracts in sync
- **Node.js + React** — a REST API backend paired with a modern React SPA frontend
- **GitHub OAuth authentication** — users can sign in using their GitHub account; no username/password forms to build or maintain
- **Clean developer experience** — a single `npm run dev` command that spins up the entire stack

---

## How It's Built

### Monorepo structure

```
node-react-fullstack/
├── package.json              # npm workspaces root, concurrently dev script
├── packages/
│   ├── shared/               # shared TypeScript types
│   ├── backend/              # Express API
│   └── frontend/             # React + Vite SPA
```

npm workspaces link the packages together so `@node-react-fullstack/shared` can be imported in both `backend` and `frontend` without publishing to npm.

### Shared package (`packages/shared`)

Defines the `User` interface (id, login, displayName, avatarUrl) and `AuthStatus` type that both sides of the stack import. The package compiles to CommonJS (`dist/`) for the backend and is resolved directly as source by Vite for the frontend.

### Backend (`packages/backend`)

- **Express** as the HTTP framework
- **express-session** for session management — a signed httpOnly cookie stores the session ID; session data lives in memory (suitable for development and single-instance deployments)
- **Passport.js** with the `passport-github2` strategy handles the OAuth 2.0 dance with GitHub
- **CORS** configured to allow `http://localhost:5173` with credentials

Key routes:
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/auth/github` | Redirects to GitHub to begin OAuth flow |
| `GET` | `/auth/github/callback` | GitHub redirects here after authorization; sets session and redirects to frontend |
| `DELETE` | `/auth/logout` | Destroys the session |
| `GET` | `/api/me` | Returns the authenticated user or `401` |

### Frontend (`packages/frontend`)

- **React 18** with React Router for client-side routing
- **Vite** as the build tool with a dev proxy routing `/api` and `/auth` to the backend

### Auth flow

```
User clicks "Login with GitHub"
  → GET /auth/github (backend)
  → Redirect to github.com/login/oauth/authorize
  → User approves
  → GitHub redirects to GET /auth/github/callback (backend)
  → Passport exchanges code for token, fetches profile
  → Session is created, cookie set
  → Redirect to http://localhost:5173
  → App.tsx fetches /api/me → 200 with user data
  → React renders DashboardPage
```

---

## Getting Started

### 1. Create a GitHub OAuth App

Go to [GitHub Developer Settings](https://github.com/settings/developers) and create a new OAuth App:

- **Homepage URL**: `http://localhost:5173`
- **Authorization callback URL**: `http://localhost:3000/auth/github/callback`

### 2. Configure environment variables

```bash
cp packages/backend/.env.example packages/backend/.env
```

Fill in your credentials:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
SESSION_SECRET=a_long_random_string
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Tech Stack

| Layer      | Technology                                     | Reasoning                                                                                                                |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Language   | TypeScript 5                                   | Strongly typed language for both frontend and backend                                                                    |
| Backend    | Node.js, Express 4                             | Lightweight and flexible server framework                                                                                |
| Auth       | Passport.js, passport-github2, express-session | Simplifies OAuth integration and session management                                                                      |
| Frontend   | React 18, React Router 7                       | Modern UI library with client-side routing                                                                               |
| Build tool | Vite 6                                         | Fast development server with great support for monorepos and TypeScript. Also pretty much the baseline for React in 2026 |
| Monorepo   | npm workspaces                                 | Built-in monorepo support for managing shared code and dependencies                                                      |
| Dev runner | concurrently                                   | Run multiple npm scripts in parallel                                                                                     |
