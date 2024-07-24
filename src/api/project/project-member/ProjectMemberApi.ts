import {CreateProjectMemberForm} from "./form/CreateProjectMemberForm";
import {ProjectMemberDto} from "./response/ProjectMemberDto";
import {UpdateProjectMemberForm} from "./form/UpdateProjectMemberForm";

export interface ProjectMemberApi {
    create(form: CreateProjectMemberForm): Promise<ProjectMemberDto>
    update(form: UpdateProjectMemberForm): Promise<ProjectMemberDto>
    getByProjectId(projectId: string): Promise<ProjectMemberDto[]>
    getByIds(userId: string, projectId: string): Promise<ProjectMemberDto>
    delete(projectId: string, userId: string): Promise<void>
}