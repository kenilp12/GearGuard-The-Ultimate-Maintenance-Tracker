# GearGuard Setup Guide

## Prerequisites
- Node.js installed
- MongoDB running (or MongoDB Atlas connection string)

## Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000`

## Frontend Setup

1. Navigate to Frontend/GearGuard directory (NOT just Frontend):
```bash
cd Frontend/GearGuard
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Create a `.env` file in Frontend/GearGuard directory (optional):
```
VITE_API_URL=http://localhost:8000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Important Notes

- **Frontend path**: The frontend code is in `Frontend/GearGuard`, NOT `Frontend`
- **Backend must be running** before the frontend can make API calls
- Make sure MongoDB is running and accessible
- CORS is configured to allow requests from `http://localhost:5173`

## Troubleshooting

### Error: "Could not read package.json"
- Make sure you're in the correct directory:
  - Backend: `cd Backend`
  - Frontend: `cd Frontend/GearGuard`

### CORS Errors
- Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default is `http://localhost:5173`

### MongoDB Connection Errors
- Verify your `MONGO_URI` in the backend `.env` file
- Make sure MongoDB is running

