// src/services/api.ts
import axios, { type AxiosInstance } from 'axios';
import { getStoredAuthToken, removeAuthToken } from '../utils/authUtils';

// === IMPORTANT: Update this to your Spring Boot backend's URL ===
const API_BASE_URL = 'http://localhost:8080/api'; 
// ================================================================

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
        // You should implement a full page redirect here (e.g., using window.location.href)
    }
    return Promise.reject(error);
});

export default api;