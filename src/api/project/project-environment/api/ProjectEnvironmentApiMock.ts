import { CreateProjectEnvironmentForm } from "../form/CreateProjectEnvironmentForm";
import { UpdateProjectEnvironmentForm } from "../form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentApi} from "../ProjectEnvironmentApi";
import {ProjectEnvironmentDto} from "../response/ProjectEnvironmentDto";
import {mockTimeout} from "../../../ApiUtils";

export class ProjectEnvironmentApiMock implements ProjectEnvironmentApi {
    findById(id: string): Promise<ProjectEnvironmentDto> {
        return mockTimeout(2000).then(() => ({
                id: "1232",
                name: "DEV",
                encrypted: false,
                projectId: "123",
                createdOn: new Date(),
                updatedOn: null,
                deletedOn: null,
                deletedById: null,
                createdById: "12323232323",
            }))};
    create(form: CreateProjectEnvironmentForm): Promise<ProjectEnvironmentDto> {
        return mockTimeout(2000).then(() => ({
            id: "1232",
            name: "DEV",
            encrypted: false,
            projectId: "123",
            createdOn: new Date(),
            updatedOn: null,
            deletedOn: null,
            deletedById: null,
            createdById: "12323232323",
        }))};
    update(form: UpdateProjectEnvironmentForm): Promise<ProjectEnvironmentDto> {
        return mockTimeout(2000).then(() => ({
            id: "1232",
            name: "DEV",
            encrypted: false,
            projectId: "123",
            createdOn: new Date(),
            updatedOn: null,
            deletedOn: null,
            deletedById: null,
            createdById: "12323232323",
        }))};
    delete(id: string): Promise<void> {
        return mockTimeout(2000).then(() => {
            console.log("Project Environment deleted successfully", id);
        });
    }
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]> {
        return mockTimeout(2000).then(() => ([
            {
                id: "1232",
                name: "DEV",
                encrypted: false,
                projectId: "123",
                createdOn: new Date(),
                updatedOn: null,
                deletedOn: null,
                deletedById: null,
                createdById: "12323232323",
            },
            {
                id: "12323",
                name: "PROD",
                encrypted: true,
                projectId: "123",
                createdOn: new Date(),
                updatedOn: null,
                deletedOn: null,
                deletedById: null,
                createdById: "12323232323",
            },
        ]))
    }

}