// /front_end/src/context/AuthContext.ts - The only code that works
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { 
    type User, 
    getStoredUser, 
    setAuthData, 
    removeAuthData, 
    removeAuthToken 
} from '../utils/authUtils'; 

// 1. Define Context Interface
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void; 
    logout: () => void;
}

// 2. Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider Component (Starts on Line 24)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [user, setUser] = useState<User | null>(getStoredUser());

    const login = (userData: User, token: string) => {
        setAuthData(userData, token); 
        setUser(userData);
    };

    const logout = () => {
        removeAuthData(); 
        removeAuthToken();
        setUser(null);
    };
    
    const isAuthenticated = user !== null;

    // Line 43: THE CRITICAL JSX RETURN (Must return ReactNode)
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};