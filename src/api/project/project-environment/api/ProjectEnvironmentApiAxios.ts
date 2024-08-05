import { CreateProjectEnvironmentForm } from "../form/CreateProjectEnvironmentForm";
import { UpdateProjectEnvironmentForm } from "../form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentApi} from "../ProjectEnvironmentApi";
import {ProjectEnvironmentDto} from "../response/ProjectEnvironmentDto";
import {axiosInstance} from "../../../../AxiosClient";

export class ProjectEnvironmentApiAxios implements ProjectEnvironmentApi {
    findById(id: string): Promise<ProjectEnvironmentDto> {
        return axiosInstance.get<ProjectEnvironmentDto>(`/project-environment/get/${id}`)
            .then(response => response.data)
    }
    create(form: CreateProjectEnvironmentForm): Promise<ProjectEnvironmentDto> {
        return axiosInstance.post('/project-environment/save', form)
            .then(response => response.data);
    }
    update(form: UpdateProjectEnvironmentForm): Promise<ProjectEnvironmentDto> {
        return axiosInstance.put('/project-environment/update', form)
            .then(response => response.data)
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