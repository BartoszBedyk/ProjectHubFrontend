import {ResourcesApi} from "../ResourcesApi";
import {ResourceDto, ResourceType} from '../response/ResourceDto';
import {mockTimeout} from "../../ApiUtils";
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";
import {UpdateResourceForm} from "../form/UpdateResourceForm";
import {axiosInstance} from "../../../AxiosClient";
import {CreateResourceForm} from "../form/CreateResourceForm";


export class ResourcesApiMock implements ResourcesApi {

    async search(form: SearchForm | null): Promise<SearchResponse<ResourceDto>> {
        return mockTimeout(5000).then(() => ({
            items: [
                {
                    id: "111223",
                    name: 'Zasoby wlasne',
                    description: 'Opis zasobu',
                    value: 'Wartosc zasobu',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                },
                {
                    id: "1www23",
                    name: 'Zasoby wlasnew w',
                    description: 'Opis zasobu w',
                    value: 'Wartosc zasobu w',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                }

            ],
            total: 2,
        }));

}
    async searchByPath(form: SearchForm, envId: string, projectID: string): Promise<SearchResponse<ResourceDto>> {
        return mockTimeout(5000).then(() => ({
            items: [
                {
                    id: "111223",
                    name: 'Zasoby wlasne',
                    description: 'Opis zasobu',
                    value: 'Wartosc zasobu',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                },
                {
                    id: "1www23",
                    name: 'Zasoby wlasnew w',
                    description: 'Opis zasobu w',
                    value: 'Wartosc zasobu w',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                }

            ],
            total: 2,
        }));

    }

    async readSecret(id: string): Promise<string>{
        return mockTimeout(5000).then();
    }

    updateResource(form : UpdateResourceForm): Promise<SearchResponse<ResourceDto>> {
        return mockTimeout(5000).then(() => ({
            items: [
                {
                    id: "111223",
                    name: 'Zasoby wlasne',
                    description: 'Opis zasobu',
                    value: 'Wartosc zasobu',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                },
                {
                    id: "1www23",
                    name: 'Zasoby wlasnew w',
                    description: 'Opis zasobu w',
                    value: 'Wartosc zasobu w',
                    resourceType: ResourceType.attachment,
                    environmentId: '1',
                    projectId: '1',
                    createdById: 'Admin',
                    createdOn: "28-09-2023",
                    lastModifiedOn: "28-09-2023",
                    deletedById: "adminek",
                    deletedOn: "11.09.2001"
                }

            ],
            total: 2,
        }));
    }

    get(id: string): Promise<ResourceDto>{
        return mockTimeout(5000).then(() => ({
            id: "111223",
            name: 'Nazwa zasobu',
            description: 'Opis zasobu',
            value: 'Tekst zasobu może być naprawdę długi',
            resourceType: ResourceType.text,
            environmentId: '1',
            projectId: '1',
            createdById: 'Admin',
            createdOn: "28-09-2023",
            lastModifiedOn: "28-09-2023",
            deletedById: "adminek",
            deletedOn: "11.09.2001"
        }));
    }

    create(form: CreateResourceForm, type : string): Promise<ResourceDto> {
        return mockTimeout(5000).then(() => ({
            id: "111223",
            name: 'Nazwa zasobu',
            description: 'Opis zasobu',
            value: 'Tekst zasobu może być naprawdę długi',
            resourceType: ResourceType.text,
            environmentId: '1',
            projectId: '1',
            createdById: 'Admin',
            createdOn: "28-09-2023",
            lastModifiedOn: "28-09-2023",
            deletedById: "adminek",
            deletedOn: "11.09.2001"
        }));
    }

    delete(id: string): Promise<ResourceDto> {
        return mockTimeout(5000).then(() => ({
            id: "111223",
            name: 'Nazwa zasobu',
            description: 'Opis zasobu',
            value: 'Tekst zasobu może być naprawdę długi',
            resourceType: ResourceType.text,
            environmentId: '1',
            projectId: '1',
            createdById: 'Admin',
            createdOn: "28-09-2023",
            lastModifiedOn: "28-09-2023",
            deletedById: "adminek",
            deletedOn: "11.09.2001"
        }));
    }

    findByUserId(userId: string): Promise<Array<ResourceDto>> {
        return mockTimeout(5000).then(() =>[
            {
                id: "111223",
                name: 'Nazwa zasobu',
                description: 'Opis zasobu',
                value: 'Tekst zasobu może być naprawdę długi',
                resourceType: ResourceType.text,
                environmentId: '1',
                projectId: '1',
                createdById: 'Admin',
                createdOn: "28-09-2023",
                lastModifiedOn: "28-09-2023",
                deletedById: "adminek",
                deletedOn: "11.09.2001"
            },
            {
                id: "111223",
                name: 'Nazwa zasobu',
                description: 'Opis zasobu',
                value: 'Tekst zasobu może być naprawdę długi',
                resourceType: ResourceType.text,
                environmentId: '1',
                projectId: '1',
                createdById: 'Admin',
                createdOn: "28-09-2023",
                lastModifiedOn: "28-09-2023",
                deletedById: "adminek",
                deletedOn: "11.09.2001"
            },

        ])
    }





}