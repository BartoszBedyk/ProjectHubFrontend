import {CreateProjectForm} from "./form/CreateProjectForm";
import {ProjectDTO} from "./response/ProjectDTO";
import {UpdateProjectForm} from "./form/UpdateProjectForm";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";

export interface ProjectApi {
    create(form: CreateProjectForm): Promise<ProjectDTO>
    update(form: UpdateProjectForm): Promise<ProjectDTO>
    get(id: string): Promise<ProjectDTO>
    search(form: SearchForm): Promise<SearchResponse<ProjectDTO>>;
    delete(id: string): Promise<void>;
}