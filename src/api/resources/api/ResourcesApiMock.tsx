import {ResourcesApi} from "../ResourcesApi";
import {ResourceDto, ResourceType} from '../response/ResourceDto';
import {mockTimeout} from "../../ApiUtils";


export class ResourcesApiMock implements ResourcesApi {

    get(): Promise<ResourceDto> {
        return mockTimeout(5000).then(() => ({
            id: "111223",
            name: 'Zasoby wlasne',
            description: 'Opis zasobu',
            value: 'Wartosc zasobu',
            resourceType: ResourceType.attachment,
            environmentId: '1',
            projectId: '1',
            createdById: 'Admin',
            createdOn: new Date(),
            lastModifiedOn: new Date()
        }))
    }
}