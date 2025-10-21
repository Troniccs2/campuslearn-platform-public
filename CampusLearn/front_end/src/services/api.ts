import axios, { type AxiosInstance } from 'axios';
import { getStoredAuthToken, removeAuthToken } from '../utils/authUtils';

// === FINAL CRITICAL FIX: Hardcoded Live Backend URL ===
// Changed the baseURL to end at the server root, NOT including the '/api' suffix.
// This allows the frontend to construct the URL correctly as:
// [BASE_URL] + [ENDPOINT] -> '.../onrender.com' + '/api/topics'
const API_BASE_URL = 'https://campuslearn-backend-final.onrender.com'; 
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
