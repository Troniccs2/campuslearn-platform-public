import axios, { type AxiosInstance } from 'axios';
// FIX: Temporarily removed the problematic imports (setAuthToken and types)
import { getStoredAuthToken, removeAuthToken } from '../utils/authUtils'; 

// 1. FIX: Defining required interfaces locally to resolve "Cannot find module" error (2307)
interface LoginData {
    email: string;
    password: string;
}
interface AuthResponse {
    token: string;
    // Assuming user data is returned on successful login
    user: { id: number; email: string; role: string; }; 
}

// 2. FIX: Stubbing the setAuthToken function locally to resolve "no exported member" error (2305)
// IMPORTANT: You must ensure this function is correctly exported from '../utils/authUtils'
const setAuthToken = (token: string): void => {
    // Placeholder logic - ensure your actual authUtils function stores the token (e.g., in localStorage)
    console.log(`Token set locally: ${token}`); 
};


// === FINAL DEFINITIVE BASE URL: Includes the /api prefix ===
// This is REQUIRED because all backend controllers start with @RequestMapping("/api/...").
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

// === New Centralized Login Function to GUARANTEE correct path ===
/**
 * Handles user login by calling the /auth/login endpoint.
 * @param data - The user's email and password.
 * @returns The response data containing the token/user info.
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
    // FIX: The path is explicitly set to "/auth/login" to resolve the 404 issue.
    const response = await api.post<AuthResponse>("/auth/login", data);
    
    // Assuming the response includes the Basic Auth Token
    if (response.data.token) {
        setAuthToken(response.data.token);
    }

    return response.data;
};
// ================================================================

export default api;
