import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
    },
});

let authToken = '';

axiosInstance.interceptors.request.use(
    config => {
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

const authenticate = async () => {
    try {
        const response = await axiosInstance.post('http://localhost:8080/auth/login', {
            email: 'admin@test.pl',
            password: 'password123'
        });

        if (response.data && response.data.token) {
            authToken = response.data.token;
        }

        return response.data;
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};

const axiosClientAuth = axios.create({
    baseURL: 'http://localhost:8080',

});

axiosClientAuth.interceptors.request.use(
    config => {
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authenticate()}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosClientAuth.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export { axiosClientAuth, authenticate };
