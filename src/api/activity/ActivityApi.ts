import {ActivityDTO} from "./response/ActivityDto";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";

export interface ActivityApi{
    search(searchForm: SearchForm): Promise<SearchResponse<ActivityDTO>>
}