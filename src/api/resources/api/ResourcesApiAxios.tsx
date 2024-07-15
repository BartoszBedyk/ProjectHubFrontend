import { ResourceDto } from '../response/ResourceDto';
import { ResourcesApi } from '../ResourcesApi';
import { axiosInstance } from '../../../AxiosClient';
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";


export class ResourcesApiAxios implements ResourcesApi {


     search(form: SearchForm): Promise<SearchResponse<ResourceDto>> {
        return axiosInstance.post<SearchResponse<ResourceDto>>('/resource/search', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            })
    }

    searchByPath(form: SearchForm): Promise<SearchResponse<ResourceDto>> {
        return axiosInstance.post<SearchResponse<ResourceDto>>('evnID/resID', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            })
    }

    async readSecret(form: SearchForm): Promise<string> {
        try {
            const response = await axiosInstance.post("/resource/secret-unmasked", form);
            return response.data;
        } catch (error) {
            console.error('Error reading secret:', error);
            throw error;
        }
    }




}