import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import {getToken} from "../../storage/AuthStorage";


const PrivateRoute = ({ children }: any) => {
    const token = getToken();
    const expirationDate = secureLocalStorage.getItem('expirationDate');

    if (!token || !expirationDate || new Date().getTime() > expirationDate) {
        return <Navigate to="/auth/login" />;

    }

    return children;
};

export default PrivateRoute;