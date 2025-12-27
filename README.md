# GearGuard: The Ultimate Maintenance Tracker

A full-stack MERN application for tracking maintenance work orders, equipment, and tasks.

## Tech Stack

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User Authentication (Sign Up / Login)
- Dashboard with quick actions
- Work Order Management (Create, View, Edit, Delete)
- Equipment Category Management
- Component Category Management
- Task Activity Management
- Reports and Maintenance Schedule
- Settings Page

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gearguard
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Work Orders
- `GET /api/workorders` - Get all work orders (Protected)
- `GET /api/workorders/:id` - Get single work order (Protected)
- `POST /api/workorders` - Create work order (Protected)
- `PUT /api/workorders/:id` - Update work order (Protected)
- `DELETE /api/workorders/:id` - Delete work order (Protected)

### Equipment
- `GET /api/equipment/categories` - Get equipment categories (Protected)
- `POST /api/equipment/categories` - Create equipment category (Protected)
- `PUT /api/equipment/categories/:id` - Update equipment category (Protected)
- `DELETE /api/equipment/categories/:id` - Delete equipment category (Protected)
- `GET /api/equipment/component-categories` - Get component categories (Protected)
- `POST /api/equipment/component-categories` - Create component category (Protected)
- `PUT /api/equipment/component-categories/:id` - Update component category (Protected)
- `DELETE /api/equipment/component-categories/:id` - Delete component category (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

### Reports
- `GET /api/reports/maintenance-schedule` - Get maintenance schedule (Protected)
- `GET /api/reports/summary` - Get summary statistics (Protected)

## Project Structure

```
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (Auth)
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json
└── README.md
```

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server
3. Start the frontend development server
4. Navigate to `http://localhost:3000`
5. Sign up for a new account or login
6. Start creating work orders, equipment categories, and tasks!

## Notes

- Make sure MongoDB is running before starting the backend
- The JWT secret should be changed in production
- All API endpoints (except auth) require authentication via JWT token

