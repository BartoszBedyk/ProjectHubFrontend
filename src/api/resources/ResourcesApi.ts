import {ResourceDto} from "./response/ResourceDto";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";

export interface ResourcesApi {
    search(form: SearchForm): Promise<SearchResponse<ResourceDto>>
    searchByPath(form: SearchForm): Promise<SearchResponse<ResourceDto>>
    readSecret(id: string): Promise<string>
}