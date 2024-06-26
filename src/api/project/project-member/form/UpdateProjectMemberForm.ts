import {Role} from "../response/Role";

export interface UpdateProjectMemberForm {
    userId: string;
    projectId: string;
    role: Role;
    environmentIds: string[];
}