import { CreateTechnologyForm } from "../form/CreateTechnologyForm";
import {TechnologyDTO} from "../response/TechnologyDTO";
import {TechnologyApi} from "../TechnologyApi";
import {mockTimeout} from "../../../ApiUtils";

export class TechnologyApiMock implements TechnologyApi {
    findById(technologyId: string): Promise<TechnologyDTO> {
        return mockTimeout(2000).then(() => (
            {
                id: "1",
                name: "Java",
                description: "Opis Java",
            }));
    }
    create(form: CreateTechnologyForm): Promise<TechnologyDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: form.name,
            description: form.description,
        }));
    }
    findAll(): Promise<TechnologyDTO[]> {
        return mockTimeout(2000).then(() => ([
            {
                id: "1",
                name: "Java",
                description: "Opis Java",
            },
            {
                id: "2",
                name: "C++",
                description: "Opis C++",
            },
            {
                id: "3",
                name: "Kotlin",
                description: "Opis Kotlin",
            },
            {
                id: "4",
                name: "React",
                description: "Opis React",
            },
        ]));
    }
}