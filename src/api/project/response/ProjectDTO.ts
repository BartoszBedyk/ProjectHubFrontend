export interface ProjectDTO {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    createdById: string;
    technologies: string[];
}