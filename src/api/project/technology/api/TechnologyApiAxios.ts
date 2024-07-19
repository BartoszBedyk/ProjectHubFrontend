import { CreateTechnologyForm } from "../form/CreateTechnologyForm";
import {TechnologyDTO} from "../response/TechnologyDTO";
import {TechnologyApi} from "../TechnologyApi";
import {axiosInstance} from "../../../../AxiosClient";
import {ProjectDTO} from "../../response/ProjectDTO";

export class TechnologyApiAxios implements TechnologyApi {
    findById(technologyId: string): Promise<TechnologyDTO> {
        return axiosInstance.get<ProjectDTO>(`/technology/${technologyId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching technology:', error);
                throw error;
            });
    }
    create(form: CreateTechnologyForm): Promise<TechnologyDTO> {
        return axiosInstance.post<TechnologyDTO>('/technology/create', form)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating technology:', error);
                throw error;
            });
    }
    findAll(): Promise<TechnologyDTO[]> {
        return axiosInstance.get<TechnologyDTO[]>('/technology/find-all')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching technologies:', error);
                throw error;
            });
    }

}