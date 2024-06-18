import axios from 'axios';
import {getToken, setToken} from "./storage/AuthStorage";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});


let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMGQ1NGJmNi01ZGEzLTQwOTQtOGZlZC00ZjQ3OGU2OWVmODQiLCJleHAiOjE3MTkzMDk3OTh9.6VeDzpgxMHbFsiW7d6K9dbgx-vOXw3_L9mGifvZ0yBU'
setToken(authToken)


axiosInstance.interceptors.request.use(
    config => {
        const token = getToken()
        if(token){
            config.headers['Authorization'] = `Bearer ${getToken()}`;
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


export {axiosInstance};
