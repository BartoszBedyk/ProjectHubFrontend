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
}