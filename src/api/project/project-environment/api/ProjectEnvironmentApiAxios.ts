import { CreateProjectEnvironmentForm } from "../form/CreateProjectEnvironmentForm";
import { UpdateProjectEnvironmentForm } from "../form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentApi} from "../ProjectEnvironmentApi";
import {ProjectEnvironmentDto} from "../response/ProjectEnvironmentDto";
import {axiosInstance} from "../../../../AxiosClient";

export class ProjectEnvironmentApiAxios implements ProjectEnvironmentApi {
    create(form: CreateProjectEnvironmentForm): Promise<void> {
        return axiosInstance.post('/project-environment/save', form)
            .then(() => {});
    }
    update(form: UpdateProjectEnvironmentForm): Promise<void> {
        return axiosInstance.put('/project-environment/update', form)
            .then(() => {});
    }
    delete(id: string): Promise<void> {
        return axiosInstance.delete(`/project-environment/delete/${id}`)
            .then(() => {});
    }
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]> {
        return axiosInstance.get<ProjectEnvironmentDto[]>(`/project-environment/find-all/${projectId}`)
            .then(response => response.data)
    }

}