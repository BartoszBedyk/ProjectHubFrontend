import {CreateProjectEnvironmentForm} from "./form/CreateProjectEnvironmentForm";
import {UpdateProjectEnvironmentForm} from "./form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentDto} from "./response/ProjectEnvironmentDto";

export interface ProjectEnvironmentApi {
    create(form: CreateProjectEnvironmentForm): Promise<void>;
    update(form: UpdateProjectEnvironmentForm): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]>;
}