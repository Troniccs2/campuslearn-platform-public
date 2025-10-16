// src/utils/authUtils.ts

// Define the User interface here to make it accessible to AuthContext
export interface User {
    email: string;
    firstName: string;
    role: 'ADMIN' | 'TUTOR' | 'STUDENT' | string; 
}

const USER_KEY = 'user';
const TOKEN_KEY = 'basicAuthToken'; 

export const createBasicAuthToken = (email: string, password: string): string => {
    return btoa(`${email}:${password}`);
};

export const setAuthData = (user: User, token: string): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
};

export const getStoredUser = (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const removeAuthData = (): void => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
};

export const getStoredAuthToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
    localStorage.removeItem(TOKEN_KEY); 
};