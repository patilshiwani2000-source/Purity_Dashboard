let BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

if (!BACKEND_SERVER) {
  // Remove "/api" from here
  BACKEND_SERVER = "http://localhost:8000";  // No trailing /api
}

export const API_SERVER = BACKEND_SERVER;