import axios from 'axios'
import {getToken, setToken} from "./storage/AuthStorage";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});


let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMWE0YmFiNC1kNDJiLTRiNzEtYTU4Ny1jZGRkNTBmNWEyOTYiLCJleHAiOjE3MTk0NzYyNTR9.YdvlIWEepv3Ydun8-bfgAGnnpCc5_D55kvEUXcge9e4'
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
