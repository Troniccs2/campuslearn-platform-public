// mobile_app/src/services/api.ts

import axios, { AxiosInstance } from 'axios';

// 🚨 IMPORTANT: Replace the IP address with your actual local IP
const API_BASE_URL: string = 'http://192.168.56.1:8080/api'; 

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;