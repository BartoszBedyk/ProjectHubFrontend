import {TechnologyDTO} from "../response/TechnologyDTO";

export interface UpdateProjectForm {
    id: string;
    name: string;
    description: string;
    technologyList: TechnologyDTO[];
}