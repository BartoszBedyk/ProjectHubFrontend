import { ResourceDto } from '../response/ResourceDto';
import { ResourcesApi } from '../ResourcesApi';
import { axiosInstance } from '../../../AxiosClient';

export class ResourcesApiAxios implements ResourcesApi {
    private data = {
        criteria: [
            {
                fieldName: 'name',
                value: 'Wybitny plik png',
                operator: 'EQUALS'
            }
        ],
        page: 1,
        size: 1,
        searchSort: [
            {
                by: 'name',
                order: 'ASC'
            }
        ]
    };

    get(): Promise<ResourceDto> {
        return axiosInstance.post<ResourceDto>('/resource/search', this.data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            });
    }
}
