import React, {useEffect, useState} from 'react';
import './App.css';
import ResponsiveAppBar from "./components/AppBar/AppBar";
import {ResourceDto} from "./api/resources/response/ResourceDto";
import Login from "./pages/login/login";
import "./i18n"
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";



function App() {
    return(
        <RouterProvider router={router} />
    )
}

export default App;
