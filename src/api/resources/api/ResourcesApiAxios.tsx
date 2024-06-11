import React, {useState} from 'react';
import {ResourceData} from "../form/ResourceForm";
import {getResource} from "../ResourceApi";



const ResourcesList: React.FC = () => {
    let [resources, setResources] = useState<ResourceData[]>([]);




    getResource().then(resources => {
        console.log('Taken resources:', resources);
        setResources(resources);
    }).catch(error => {
        console.error('Failed: ', error);
    });


    return (
        <div>
            {resources.map(resource => (
                    <li key={resource.id}>{resource.name} | {resource.value} | {resource.description} | {resource.createdById}</li>
                ))}
        </div>
    );



};

export default ResourcesList;