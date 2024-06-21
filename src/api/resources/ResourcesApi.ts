import {ResourceDto} from "./response/ResourceDto";
import {SearchForm} from "../../commons/Search/SearchForm";

export interface ResourcesApi {
    search(form: SearchForm): Promise<ResourceDto>
}