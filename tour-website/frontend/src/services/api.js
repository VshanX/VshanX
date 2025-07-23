import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const tourService = {
    // Get all tours
    getAllTours: async () => {
        try {
            const response = await api.get('/tours');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single tour by ID
    getTourById: async (id) => {
        try {
            const response = await api.get(`/tours/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new tour
    createTour: async (tourData) => {
        try {
            const response = await api.post('/tours', tourData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update tour
    updateTour: async (id, tourData) => {
        try {
            const response = await api.put(`/tours/${id}`, tourData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete tour
    deleteTour: async (id) => {
        try {
            const response = await api.delete(`/tours/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api;