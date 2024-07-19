import {TechnologyDTO} from "./response/TechnologyDTO";
import {CreateTechnologyForm} from "./form/CreateTechnologyForm";

export interface TechnologyApi {
    findAll(): Promise<TechnologyDTO[]>;
    create(form: CreateTechnologyForm): Promise<TechnologyDTO>;
    findById(technologyId: string): Promise<TechnologyDTO>;
}