import {TechnologyDTO} from "../response/TechnologyDTO";

export interface CreateProjectForm {
    name: string;
    description: string;
    technologyList: TechnologyDTO[];
}