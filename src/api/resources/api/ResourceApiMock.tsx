import MockAdapter from 'axios-mock-adapter';

import React, {useEffect, useState} from "react";
import {ResourceData, ResourceType} from "../form/ResourceForm";
import {axiosClientAuth} from "../../../AxiosClient";

const axios = axiosClientAuth;
const mockAdapter = new MockAdapter(axios);

mockAdapter.onGet('/resources/search/mock').reply(200, [
    {
        id: 1,
        name: 'Zasoby wlasne',
        description: 'Opis zasobu',
        value: 'Wartosc zasobu',
        resourceType: ResourceType.attachment,
        environmentId: '1',
        projectId: '1',
        createdById: 'Admin',
        createdOn: '10.06.2024',
        lastModifiedOn: '10.06.2024',
    },
    {
        id: 2,
        name: 'Zasoby 2',
        description: 'Opis zasobu 2',
        value: 'Wartosc zasobu 2 ',
        resourceType: ResourceType.secret,
        environmentId: '1',
        projectId: '1',
        createdById: 'Admin',
        createdOn: '10.06.2024',
        lastModifiedOn: '10.06.2024',
    },
]);

const ResourcesList: React.FC = () => {
    const [resources, setResources] = useState<ResourceData[]>([]);

    useEffect(() => {
        axios.get('/resources/search/mock')
            .then(response => {
                setResources(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {resources.map(resource => (
                <li key={resource.id}>{resource.name} | {resource.value} | {resource.description} | {resource.createdById}</li>
            ))}
        </div>
    );
};

export default ResourcesList;