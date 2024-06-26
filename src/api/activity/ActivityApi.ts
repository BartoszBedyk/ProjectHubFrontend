import {SearchForm} from "../../forms/SearchForm";
import {SearchResponse} from "../../forms/SearchResponse";
import {ActivityDTO} from "./response/ActivityDto";

export interface ActivityApi{
    search(searchForm: SearchForm): Promise<SearchResponse<ActivityDTO>>
}