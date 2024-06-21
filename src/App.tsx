import React, {useEffect, useState} from 'react';
import './App.css';
import {ResourceDto} from "./api/resources/response/ResourceDto";



function App() {
    const [resource, setResource] = useState<ResourceDto>()

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
       //<Login></Login>
        <div></div>

    );
}

export default App;
