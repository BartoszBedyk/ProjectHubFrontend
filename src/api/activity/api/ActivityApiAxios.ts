import { SearchForm } from "../../../forms/SearchForm";
import { SearchResponse } from "../../../forms/SearchResponse";
import {ActivityApi} from "../ActivityApi";
import {ActivityDTO} from "../response/ActivityDto";

export class ActivityApiAxios implements ActivityApi {
    search(searchForm: SearchForm): Promise<SearchResponse<ActivityDTO>> {
        throw new Error("Method not implemented.");
    }

}