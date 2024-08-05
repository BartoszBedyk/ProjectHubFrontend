import {ResourceDto} from "./response/ResourceDto";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {UpdateResourceForm} from "./form/UpdateResourceForm";
import {CreateResourceForm} from "./form/CreateResourceForm";

export interface ResourcesApi {
    search(form: SearchForm): Promise<SearchResponse<ResourceDto>>
    searchByPath(form: SearchForm, envId: string, projectID: string): Promise<SearchResponse<ResourceDto>>
    readSecret(id: string): Promise<string>
    updateResource(form : UpdateResourceForm): Promise<SearchResponse<ResourceDto>>
    get(id: string): Promise<ResourceDto>
    create(form: CreateResourceForm, type: string): Promise<ResourceDto>
    delete(id: string): Promise<ResourceDto>
}