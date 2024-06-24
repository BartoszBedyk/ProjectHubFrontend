import { ResourceDto } from '../response/ResourceDto';
import { ResourcesApi } from '../ResourcesApi';
import { axiosInstance } from '../../../AxiosClient';
import {SearchForm} from "../../../commons/Search/SearchForm";

export class ResourcesApiAxios implements ResourcesApi {


    search(form: SearchForm): Promise<ResourceDto> {
        return axiosInstance.post<ResourceDto>('/resource/search', form )
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching resources:', error);
                throw error;
            });
    }
}
