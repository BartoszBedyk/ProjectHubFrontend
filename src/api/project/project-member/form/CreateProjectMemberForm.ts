import {Role} from "../response/Role";

export interface CreateProjectMemberForm {
    firstName: string;
    lastName: string;
    role: Role;
    projectId: string;
    userId: string;
    environmentIds: string[];
}