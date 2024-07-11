import {ResourcesApi} from "../ResourcesApi";
import {ResourceDto, ResourceType} from '../response/ResourceDto';
import {mockTimeout} from "../../ApiUtils";
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";


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
                }

            ],
            total: 2,
        }));

}
    async searchByPath(form: SearchForm | null): Promise<SearchResponse<ResourceDto>> {
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
                }

            ],
            total: 2,
        }));

    }


}