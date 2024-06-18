import React, {useEffect, useState} from 'react';
import './App.css';
import {api} from "./api/AppApi";
import {ResourceDto} from "./api/resources/response/ResourceDto";


function App() {
    const [resource, setResource] = useState<ResourceDto>()

    useEffect(() => {
        console.log("kdkdkdkdkdkdkdkdkdkdkdkdkdk")
        api.resources.get().then(data => {
            console.log("DUPA", data)
            setResource(data)
        })

    }, []);

    return (
        <div className="App">
            <div>
                <p>{resource?.resourceType}</p>

            </div>

        </div>
    );
}

export default App;
