import { ResourceDto } from '../response/ResourceDto';
import { ResourcesApi } from '../ResourcesApi';
import { axiosInstance } from '../../../AxiosClient';
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";
import {UpdateResourceForm} from "../form/UpdateResourceForm";
import {CreateResourceForm} from "../form/CreateResourceForm";


export class ResourcesApiAxios implements ResourcesApi {


     search(form: SearchForm): Promise<SearchResponse<ResourceDto>> {
        return axiosInstance.post<SearchResponse<ResourceDto>>('/resource/search', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            })
    }

    searchByPath(form: SearchForm, envId: string, projectID: string): Promise<SearchResponse<ResourceDto>> {
        return axiosInstance.post<SearchResponse<ResourceDto>>(`${projectID}/${envId}`, form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            })
    }

    async readSecret(id: string): Promise<string> {
        try {
            const response = await axiosInstance.post(`/resource/secret-unmasked/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error reading secret:', error);
            throw error;
        }
    }

    updateResource(form : UpdateResourceForm): Promise<SearchResponse<ResourceDto>> {
         return axiosInstance.put(`/resource/update`, form)
             .then(response => response.data)
             .catch(error => {
                 console.error('Update resource error: ', error);
                 throw error;
             })
    }

    get(id: string): Promise<ResourceDto> {
         return axiosInstance.get(`/resource/${id}`)
             .then(response => response.data)
             .catch(error => {
                 console.error('Update resource error: ', error);
                 throw error;
             })
    }

    create(form: CreateResourceForm, type : string): Promise<ResourceDto> {
         return axiosInstance.post(`/resource/${type}`, form)
             .then(response => response.data)
             .catch(error => {
                 console.error('Update resource error: ', error);
                 throw error;
             })
    }

    delete(id: string): Promise<ResourceDto> {
         return axiosInstance.post(`/resource/delete/${id}`)
             .then(response => response.data)
             .catch(error => {
                 console.error('Delete resource error: ', error);
                 throw error;
             })
    }

    findByUserId(userId: string): Promise<Array<ResourceDto>> {
    return axiosInstance.post(`/resource/user/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Delete resource error: ', error);
            throw error;
        })
}
}