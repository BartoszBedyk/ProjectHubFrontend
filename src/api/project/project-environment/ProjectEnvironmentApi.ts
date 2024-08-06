import {CreateProjectEnvironmentForm} from "./form/CreateProjectEnvironmentForm";
import {UpdateProjectEnvironmentForm} from "./form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentDto} from "./response/ProjectEnvironmentDto";

export interface ProjectEnvironmentApi {
    create(form: CreateProjectEnvironmentForm): Promise<ProjectEnvironmentDto>;
    update(form: UpdateProjectEnvironmentForm): Promise<ProjectEnvironmentDto>;
    delete(id: string): Promise<void>;
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]>;
    findById(id: string): Promise<ProjectEnvironmentDto>;
}