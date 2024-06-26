import {Role} from "./Role";

export interface ProjectMemberDto {
    userId: string;
    firstName: string;
    lastName: string;
    createdById: string;
    createdOn: Date;
    role: Role;
    projectId: string;
    environmentIds: string[];
}