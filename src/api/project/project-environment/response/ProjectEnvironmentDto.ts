export interface ProjectEnvironmentDto {
    id: string;
    name: string;
    encrypted: boolean;
    projectId: string;
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
    deletedById: string | null;
    createdById: string;
}