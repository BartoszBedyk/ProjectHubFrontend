import { SearchForm } from "../../../commons/Search/SearchForm";
import { SearchResponse } from "../../../commons/Search/SearchResponse";
import { CreateProjectForm } from "../form/CreateProjectForm";
import { UpdateProjectForm } from "../form/UpdateProjectForm";
import {ProjectApi} from "../ProjectApi";
import {ProjectDTO} from "../response/ProjectDTO";
import {mockTimeout} from "../../ApiUtils";

export class ProjectApiMock implements ProjectApi {
    create(form: CreateProjectForm): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: "Projekt 1",
            description: "Opis Projektu 1",
            createdOn: new Date(),
            createdById: "user1",
            technologies: [
                { id: "tech1", name: "Technologia 1", description: "Opis Technologii 1" }
            ]
        }));
    }
    update(form: UpdateProjectForm): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: "Projekt 1",
            description: "Opis Projektu 1",
            createdOn: new Date(),
            createdById: "user1",
            technologies: [
                { id: "tech1", name: "Technologia 1", description: "Opis Technologii 1" }
            ]
        }));
    }
    get(id: string): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: "Projekt 1",
            description: "Opis Projektu 1",
            createdOn: new Date(),
            createdById: "user1",
            technologies: [
                { id: "tech1", name: "Technologia 1", description: "Opis Technologii 1" }
            ]
        }));
    }
    search(form: SearchForm): Promise<SearchResponse<ProjectDTO>> {
        return mockTimeout(2000).then(() => ({
            items: [
                {
                    id: "1",
                    name: "Projekt 1",
                    description: "Opis Projektu 1",
                    createdOn: new Date(),
                    createdById: "user1",
                    technologies: [
                        { id: "tech1", name: "Technologia 1", description: "Opis Technologii 1" }
                    ]
                },
                {
                    id: "2",
                    name: "Projekt 2",
                    description: "Opis Projektu 2",
                    createdOn: new Date(),
                    createdById: "user2",
                    technologies: [
                        { id: "tech2", name: "Technologia 2", description: "Opis Technologii 2" }
                    ]
                },
            ],
            total: 2,
        }));
    }
}