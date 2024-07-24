import {CreateProjectMemberForm} from "../form/CreateProjectMemberForm";
import {UpdateProjectMemberForm} from "../form/UpdateProjectMemberForm";
import {ProjectMemberDto} from "../response/ProjectMemberDto";
import {mockTimeout} from "../../../ApiUtils";
import {Role} from "../response/Role";
import {ProjectMemberApi} from "../ProjectMemberApi";

export class ProjectMemberApiMock implements ProjectMemberApi{
    getByIds(userId: string, projectId: string): Promise<ProjectMemberDto> {
        return mockTimeout(2000).then(() => ({
            userId: "1",
            firstName: "Kamil",
            lastName: "Smolarek",
            createdById: "1b671a64-40d5-491e-99b0-da01ff1f3341",
            createdOn: new Date(),
            role: Role.OWNER,
            projectId: "project123",
            environmentIds: ["env1", "env2"],
        }));    }
    create(form: CreateProjectMemberForm): Promise<ProjectMemberDto> {
        return mockTimeout(2000).then(() => ({
            userId: "1",
            firstName: "Kamil",
            lastName: "Smolarek",
            createdById: "1b671a64-40d5-491e-99b0-da01ff1f3341",
            createdOn: new Date(),
            role: Role.OWNER,
            projectId: "project123",
            environmentIds: ["env1", "env2"],
        }));
    }
    update(form: UpdateProjectMemberForm): Promise<ProjectMemberDto>  {
        return mockTimeout(2000).then(() => ({
            userId: "1",
            firstName: "Updated",
            lastName: "Name",
            createdById: "1b671a64-40d5-491e-99b0-da01ff1f3341",
            createdOn: new Date(),
            role: Role.MAINTAINER,
            projectId: "project123",
            environmentIds: ["env3", "env4"],
        }));
    }
    getByProjectId(projectId: string): Promise<ProjectMemberDto[]>  {
        return mockTimeout(1000).then(() => ([{
            userId: "1",
            firstName: "Kamil",
            lastName: "Smolarek",
            createdById: "1b671a64-40d5-491e-99b0-da01ff1f3341",
            createdOn: new Date(),
            role: Role.OWNER,
            projectId: projectId,
            environmentIds: ["env1", "env2"],
        }]));
    }
    delete(projectId: string, userId: string): Promise<void> {
        return mockTimeout(500).then(() => {
            console.log(`Deleted project member`);
        });
    }
}