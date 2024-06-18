import React, {useEffect, useState} from 'react';
import './App.css';
import {api} from "./api/AppApi";
import {ResourceDto} from "./api/resources/response/ResourceDto";
import {LoginGrid} from "./components/LoginGrid";
import LogInCard from "./components/LogInCard";




function App() {
    const [resource, setResource] = useState<ResourceDto>()

    useEffect(() => {
        console.log("kdkdkdkdkdkdkdkdkdkdkdkdkdk")
        api.resources.get().then(data => {
            console.log("DUPA", data)
            console.log(data.resourceType)
            setResource(data)
        })

    }, []);

    return (
        <LoginGrid>
            <LogInCard></LogInCard>
        </LoginGrid>

    );
}

export default App;
