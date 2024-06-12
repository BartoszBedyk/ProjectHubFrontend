import { CreateProjectEnvironmentForm } from "../form/CreateProjectEnvironmentForm";
import { UpdateProjectEnvironmentForm } from "../form/UpdateProjectEnvironmentForm";
import {ProjectEnvironmentApi} from "../ProjectEnvironmentApi";
import {ProjectEnvironmentDto} from "../response/ProjectEnvironmentDto";
import {mockTimeout} from "../../../ApiUtils";

export class ProjectEnvironmentApiMock implements ProjectEnvironmentApi {
    create(form: CreateProjectEnvironmentForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(form: UpdateProjectEnvironmentForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(projectId: string): Promise<ProjectEnvironmentDto[]> {
        return mockTimeout(2000).then(() => ([
            {
                id: "1232",
                name: "DEV",
                isEncrypted: false,
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
                isEncrypted: true,
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