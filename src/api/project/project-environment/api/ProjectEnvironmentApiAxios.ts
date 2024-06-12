import { CreateProjectEnvironmentForm } from "../form/CreateProjectEnvironmentForm";
import { UpdateProjectEnvironmentForm } from "../form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentApi} from "../ProjectEnvironmentApi";
import {ProjectEnvironmentDto} from "../response/ProjectEnvironmentDto";

export class ProjectEnvironmentApiAxios implements ProjectEnvironmentApi {
    create(form: CreateProjectEnvironmentForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(form: UpdateProjectEnvironmentForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]> {
        throw new Error("Method not implemented.");
    }

}