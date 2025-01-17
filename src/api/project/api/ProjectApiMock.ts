import { SearchForm } from "../../../commons/Search/SearchForm";
import { SearchResponse } from "../../../commons/Search/SearchResponse";
import { CreateProjectForm } from "../form/CreateProjectForm";
import { UpdateProjectForm } from "../form/UpdateProjectForm";
import {ProjectApi} from "../ProjectApi";
import {ProjectDTO} from "../response/ProjectDTO";
import {mockTimeout} from "../../ApiUtils";

export class ProjectApiMock implements ProjectApi {
    delete(id: string): Promise<void> {
        return mockTimeout(2000).then(() => (
            console.log("Project has been deleted")
        ));
    }
    create(form: CreateProjectForm): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: form.name,
            description: form.description,
            createdOn: new Date(),
            createdById: "user1",
            technologies: form.technologyList,
            deletedById: null,
            deletedOn: null,
        }));
    }
    update(form: UpdateProjectForm): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: form.name,
            description: form.description,
            createdOn: new Date(),
            createdById: "user1",
            technologies: form.technologyList,
            deletedById: null,
            deletedOn: null,
        }));
    }
    get(id: string): Promise<ProjectDTO> {
        return mockTimeout(2000).then(() => ({
            id: "1",
            name: "Projekt 1",
            description: "Opis Projektu 1",
            createdOn: new Date(),
            createdById: "user1",
            technologies: ["1", "2", "3"],
            deletedById: null,
            deletedOn: null,
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
                    technologies: ["1", "2", "3"],
                    deletedById: null,
                    deletedOn: null,
                },
                {
                    id: "2",
                    name: "Projekt 2",
                    description: "Opis Projektu 2",
                    createdOn: new Date(),
                    createdById: "user2",
                    technologies: ["1", "2", "3"],
                    deletedById: null,
                    deletedOn: null,
                },
            ],
            total: 2,
        }));
    }
}