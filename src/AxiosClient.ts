import axios from 'axios';
import {getToken, setToken} from "./storage/AuthStorage";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});


let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlYTVhODZmMC1jYzE2LTQ4NzktODYwMS01OGVjMjRkMzUxZjUiLCJleHAiOjE3MTg3NjU0NTF9.7KFAoDaawTFmJsyflDRCCALlAEPsDFLXhhPDDifxIXc'
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
