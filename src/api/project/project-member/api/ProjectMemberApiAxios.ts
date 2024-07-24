import {CreateProjectMemberForm} from "../form/CreateProjectMemberForm";
import {ProjectMemberDto} from "../response/ProjectMemberDto";
import {UpdateProjectMemberForm} from "../form/UpdateProjectMemberForm";
import {axiosInstance} from "../../../../AxiosClient";
import {ProjectMemberApi} from "../ProjectMemberApi";

export class ProjectMemberApiAxios implements ProjectMemberApi{
    getByIds(userId: string, projectId: string): Promise<ProjectMemberDto> {
        return axiosInstance.get<ProjectMemberDto>(`/project-member/get/${userId}/${projectId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching project member:', error);
                throw error;
            });    }
    create(form: CreateProjectMemberForm): Promise<ProjectMemberDto> {
        return axiosInstance.post<ProjectMemberDto>('/project-member/save', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating project member:', error);
                throw error;
            });
    }
    update(form: UpdateProjectMemberForm): Promise<ProjectMemberDto>  {
        return axiosInstance.put<ProjectMemberDto>('/project-member/update', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating project member:', error);
                throw error;
            });
    }
    getByProjectId(projectId: string): Promise<ProjectMemberDto[]>  {
        return axiosInstance.get<ProjectMemberDto[]>(`/project-member/find/${projectId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching project members:', error);
                throw error;
            });
    }
    delete(projectId: string, userId: string): Promise<void> {
        return axiosInstance.delete<ProjectMemberDto>(`/project-member/delete/${userId}/${projectId}`)
            .then(() => {})
            .catch(error => {
                console.error('Error deleting project member:', error);
                throw error;
            });
    }
}