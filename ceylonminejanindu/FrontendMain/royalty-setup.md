# Royalty Calculator Setup Guide

This guide will help you set up and run the Royalty Calculator feature of the CeylonMine application.

## Prerequisites

1. Python 3.7+ installed for the backend
2. Node.js 14+ installed for the frontend
3. npm (comes with Node.js)

## Setup Instructions

### 1. Start the Flask Backend

The royalty calculator requires the Flask backend to be running in order to function properly.

#### Windows:

1. Open a command prompt
2. Navigate to the CeylonMine project directory
3. Run the start-backend.bat script:
   ```
   cd FrontendMain
   start-backend.bat
   ```

Or manually:
```
cd ceylonmine_backend_main
python app.py
```

#### Linux/Mac:

```bash
cd ceylonmine_backend_main
python app.py
```

You should see output indicating the Flask server is running on http://localhost:5000.

### 2. Run the Next.js Frontend

In a separate terminal:

```bash
cd FrontendMain
npm run dev
```

This will start the Next.js development server, usually at http://localhost:3000.

## Testing the Connection

Before using the royalty calculator in the application, you can test if the connection to the backend is working:

1. Open a browser and navigate to: http://localhost:3000/flask-test.html
2. Click "Test Direct Backend Connection" to test a direct connection to the Flask backend
3. Click "Test Next.js API Route" to test the connection through the Next.js API

If both tests succeed, the royalty calculator should work in the main application.

## Troubleshooting

### "Failed to fetch" Error

If you see "Failed to fetch" when calculating royalty:

1. Make sure the Flask backend is running
2. Check the browser console for more detailed error messages
3. Ensure there are no firewall issues blocking the connection to localhost:5000
4. Try restarting both the backend and frontend

### CORS Issues

If you encounter CORS errors:

1. Make sure the Flask backend has CORS enabled (this should be configured already)
2. Verify you're using the correct URLs for your environment

### Database Connection Issues

If the calculation works but data isn't being saved:

1. Check that the Supabase connection is properly configured
2. Verify the .env file in the backend has the correct Supabase credentials

## Security Note

In a production environment, you would want to:

1. Add proper authentication for API endpoints
2. Use HTTPS for all connections
3. Add rate limiting to prevent abuse

## Need Help?

If you continue to experience issues, contact the development team with error details and screenshots. 