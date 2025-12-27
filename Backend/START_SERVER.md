# How to Start the Backend Server

## Quick Start

1. Open a terminal/command prompt

2. Navigate to the Backend directory:
   ```powershell
   cd Backend
   ```

3. Start the server:
   ```powershell
   npm run dev
   ```

4. You should see:
   ```
   MongoDB connected (or a warning if no DB)
   Server running on port 8000
   CORS enabled for: http://localhost:5173
   ```

## Important Notes

- **The backend MUST be running** before the frontend can make API calls
- The server will start even without MongoDB connection (for testing)
- Keep this terminal window open while developing
- The server runs on `http://localhost:8000`

## Troubleshooting

### Port 8000 already in use
- Change the port in `.env` file: `PORT=8001`
- Or stop the process using port 8000

### Server won't start
- Make sure you're in the `Backend` directory
- Run `npm install` if dependencies are missing
- Check for error messages in the terminal

