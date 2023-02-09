import axios from 'axios';
import authService from 'services/authService';

class Interceptor {
    initialize = (store: any) => {
        // Add a request interceptor
        axios.interceptors.request.use(
            config => {
                const token = authService.getAccessToken();
                if (token && config && config.headers) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });
    };
}

export default Interceptor;
