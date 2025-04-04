import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/patient/login';
        }
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    // Patient
    registerPatient: async (data) => {
        try {
            const response = await api.post('/auth/patient/register', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.userData));
            }
            return response;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw error;
        }
    },
    
    loginPatient: async (data) => {
        try {
            const response = await api.post('/auth/patient/login', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.userData));
            }
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Doctor
    registerDoctor: (data) => api.post('/auth/doctor/register', data),
    loginDoctor: (data) => api.post('/auth/doctor/login', data),

    // Admin
    registerAdmin: async (data) => {
        try {
            const response = await api.post('/auth/admin/register', data);
            return response;
        } catch (error) {
            console.error('Admin registration error:', error.response?.data || error.message);
            throw error;
        }
    },

    loginAdmin: async (data) => {
        try {
            const response = await api.post('/auth/admin/login', data);
            return response;
        } catch (error) {
            console.error('Admin login error:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default api; 