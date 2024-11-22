# Blog Application

A full-stack blog application built with Next.js, TypeScript, and Prisma ORM.

---

## Tech Stack

### Frontend

- **Next.js 14**: Server-side rendering and client-side navigation.
- **TypeScript**: Static typing for robust development.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable styling.
- **Radix UI Components**: Accessible and customizable UI primitives.
- **Zod**: Schema validation for form inputs and API responses.

### Backend

- **Express.js**: Lightweight and flexible Node.js framework for building APIs.
- **Prisma ORM**: Type-safe and intuitive database interactions.
- **PostgreSQL**: Relational database for storing and managing application data.
- **JWT Authentication**: Secure authentication mechanism for user sessions.
- **bcrypt**: Password hashing for enhanced security.

---

## Project Structure

```
├── client/                # Frontend Next.js application
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
│
└── server/                # Backend Express application
    ├── src/              # Source code
    ├── prisma/           # Database schema and migrations
    └── dist/             # Compiled TypeScript output
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- npm or yarn

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   - **Frontend:**
     ```bash
     cd client
     npm install
     ```
   - **Backend:**
     ```bash
     cd ../server
     npm install
     ```

3. **Set Up Environment Variables**

   Create a `.env` file in the `server` directory with the following variables:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   PORT=8000
   JWT_SECRET="some-secret-string"
   ```

   Create a `.env` file in the `client` directory with the following variable:

   ```env
   NEXT_BACKEND_API_URL="http://localhost:8000"
   ```

4. **Set Up the Database**

   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Application**

   - **Backend Server:**
     ```bash
     cd server
     npm run build
     node dist/index.js
     ```
   - **Frontend Development Server:**

     ```bash
     cd client
     npm run dev
     ```

   - **Access the Application:**
     - Frontend: [http://localhost:3000](http://localhost:3000)
     - Backend: [http://localhost:8000](http://localhost:8000)

---

## Features

- **User Authentication:** Secure signup and login using JWT.
- **Create and View Blogs:** Post blogs and view other users' posts.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dark/Light Mode:** Seamless theme toggling.
- **Protected Routes:** Restrict access to authenticated users only.
- **Toast Notifications:** Instant feedback for user actions.
- **Server-Side Caching:** Enhanced performance for API calls.
- **Type Safety:** Ensured across the stack using TypeScript.

---

## Development Choices

1. **Next.js App Router:** For efficient server-side rendering and routing.
2. **Prisma ORM:** Provides type-safe database interactions and simplified migrations.
3. **Component Architecture:** Ensures reusability and clean code.
4. **JWT Authentication:** Offers stateless, secure user sessions.
5. **UI/UX Enhancements:**
   - Responsive layouts and themes.
   - Interactive feedback through notifications and loading states.
6. **API Structure:** RESTful API design with Zod validation for inputs.

---

## Deployment

The application is optimized for deployment on:

- **Frontend:** [Vercel](https://vercel.com) for fast and scalable hosting.
- **Backend:** Vercel Serverless Functions for server-side operations.
- **Database:** PostgreSQL providers like [Supabase](https://supabase.com) or [Railway](https://railway.app) or [NeonDb](https://neon.tech).

---
