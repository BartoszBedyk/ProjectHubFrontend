import { SearchForm } from "../../../commons/Search/SearchForm";
import { SearchResponse } from "../../../commons/Search/SearchResponse";
import { CreateProjectForm } from "../form/CreateProjectForm";
import { UpdateProjectForm } from "../form/UpdateProjectForm";
import {ProjectApi} from "../ProjectApi";
import {ProjectDTO} from "../response/ProjectDTO";
import {axiosInstance} from "../../../AxiosClient";

export class ProjectApiAxios implements ProjectApi {
    delete(id: string): Promise<void> {
        return axiosInstance.delete<ProjectDTO>(`/project/delete/${id}`)
            .then(() => {})
            .catch(error => {
                console.error("Error deleting project", error);
                throw error;
            });
    }
    create(form: CreateProjectForm): Promise<ProjectDTO> {
        return axiosInstance.post<ProjectDTO>('/project/create', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating project:', error);
                throw error;
            });
    }
    update(form: UpdateProjectForm): Promise<ProjectDTO> {
        return axiosInstance.put<ProjectDTO>('/project/update', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating project:', error);
                throw error;
            });
    }
    get(id: string): Promise<ProjectDTO> {
        return axiosInstance.get<ProjectDTO>(`/project/get/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching project:', error);
                throw error;
            });
    }
    search(form: SearchForm): Promise<SearchResponse<ProjectDTO>> {
        return axiosInstance.post<SearchResponse<ProjectDTO>>('/project/search', form )
            .then(response => response.data)
            .catch(error => {
                console.error('Error searching projects:', error);
                throw error;
            });
    }

}