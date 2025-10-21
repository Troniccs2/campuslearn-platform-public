import axios, { type AxiosInstance } from 'axios';
import { getStoredAuthToken, removeAuthToken } from '../utils/authUtils';

// === FINAL CRITICAL FIX: Hardcoded Live Backend URL ===
// The deployed application must point to its live backend service.
// This bypasses local environment variables which fail to load during the Docker build process.
const API_BASE_URL = 'https://campuslearn-backend-final.onrender.com/api'; 
// =======================================================

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// REQUEST INTERCEPTOR: Runs before every request is sent.
api.interceptors.request.use((config) => {
    const token = getStoredAuthToken();
    
    if (token) {
        // Attach the Basic Auth header automatically for secured endpoints
        config.headers.Authorization = `Basic ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: Runs when a response is received.
api.interceptors.response.use((response) => response, (error) => {
    // If the server returns a 401 (Unauthorized), it means the token is invalid/expired.
    if (error.response && error.response.status === 401) {
        // Clear the bad token and force a logout.
        removeAuthToken(); 
        console.error('Session expired or unauthorized. Logging out.');
        // Redirect to the login page so the SPA doesn't silently show blank screens
        window.location.href = '/auth/login';
    }
    return Promise.reject(error);
});

export default api;
