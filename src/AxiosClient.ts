import axios from 'axios'
import {getToken, setToken} from "./storage/AuthStorage";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});


let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMWE0YmFiNC1kNDJiLTRiNzEtYTU4Ny1jZGRkNTBmNWEyOTYiLCJleHAiOjE3MTg0MjU5MTF9.DK7OkBhZ1xaEpJvvRk4ehmT4zCg1BCX8RrAm-nSy07w'
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
