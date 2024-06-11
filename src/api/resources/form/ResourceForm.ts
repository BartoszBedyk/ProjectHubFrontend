export enum ResourceType {
    link = 'LINK',
    attachment = 'ATTACHMENT',
    secret = 'SECRET',
    text = 'TEXT',

}

export interface ResourceData {
    id: string;
    name: string;
    description: string;
    value: string;
    resourceType: ResourceType;
    environmentId: string;
    projectId: string;
    createdById: string;
    createdOn: string;
    lastModifiedOn: string;
}