import {ResourceDto} from "./response/ResourceDto";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {UpdateResourceForm} from "./form/UpdateResourceForm";

export interface ResourcesApi {
    search(form: SearchForm): Promise<SearchResponse<ResourceDto>>
    searchByPath(form: SearchForm): Promise<SearchResponse<ResourceDto>>
    readSecret(id: string): Promise<string>
    updateResource(form : UpdateResourceForm): Promise<SearchResponse<ResourceDto>>
    get(id: string): Promise<ResourceDto>
}