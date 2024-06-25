import React, {useEffect, useState} from 'react';
import './App.css';
import {ResourceDto} from "./api/resources/response/ResourceDto";
import Login from "./pages/login/login";
import "./i18n"
import {useTranslation} from "react-i18next";
import i18n from "i18next";



function App() {
    //const [resource, setResource] = useState<ResourceDto>()

    /**
    useEffect(() => {
        console.log("kdkdkdkdkdkdkdkdkdkdkdkdkdk")
        api.resources.get().then(data => {
            console.log("DUPA", data)
            console.log(data.resourceType)
            setResource(data)
        })

    }, []);
    **/

    return (
        <Login></Login>
    );
}

export default App;
