import {ActivityApi} from "../ActivityApi";
import {ActivityDTO} from "../response/ActivityDto";
import {axiosInstance} from "../../../AxiosClient";
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";

export class ActivityApiAxios implements ActivityApi {
    search(form: SearchForm): Promise<SearchResponse<ActivityDTO>> {
        return axiosInstance.post<SearchResponse<ActivityDTO>>('/activity/search', form )
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching activities:', error);
                throw error;
            });
    }

}