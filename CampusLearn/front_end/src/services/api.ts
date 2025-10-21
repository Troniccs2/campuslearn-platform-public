import axios, { type AxiosInstance } from 'axios';
import { getStoredAuthToken, removeAuthToken } from '../utils/authUtils';

// === CRITICAL CHANGE: Use the environment variable for deployment ===
// FIX: Using @ts-ignore to suppress the TypeScript compiler error (code 2591) 
// about the missing 'process' type definition, since the variable is provided at runtime.
// @ts-ignore
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'; 
// ===================================================================

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
