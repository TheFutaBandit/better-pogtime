import { getAuthToken } from '@/stores/authStore';
import axios from 'axios'

const axiosNew = axios.create({
    baseURL: "http://localhost:3001"
});

axiosNew.interceptors.request.use((config) => {
        const token = getAuthToken();
        console.log('🔑 Token from store:', token); // Debug log
        console.log('🔑 Token type:', typeof token); // Debug log
        console.log('🔑 Token length:', token?.length); // Debug log
        config.headers = config.headers || {};
        (config.headers as any).set('Authorization', token);
        return config;
    }
)

export default axiosNew;