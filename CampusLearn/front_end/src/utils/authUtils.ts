// src/utils/authUtils.ts

/**
 * Creates the Base64 Basic Auth string (email:password).
 * This is CRITICAL for our current security setup.
 */
export const createBasicAuthToken = (email: string, password: string): string => {
    // btoa() is a standard JavaScript function for Base64 encoding.
    return btoa(`${email}:${password}`);
};

/**
 * Retrieves the stored Base64 token from local storage.
 */
export const getStoredAuthToken = (): string | null => {
    return localStorage.getItem('basicAuthToken');
};

/**
 * Removes the stored token for logout.
 */
export const removeAuthToken = (): void => {
    localStorage.removeItem('basicAuthToken');
};