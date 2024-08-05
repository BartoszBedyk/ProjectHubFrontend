export interface ResourceDto {
    id: string
    name: string
    description: string
    value: string
    resourceType: ResourceType
    environmentId: string
    projectId: string
    createdById: string
    createdOn: string
    lastModifiedOn: string
    deletedOn: string
    deletedById: string
}

export enum ResourceType {
    link = 'LINK',
    attachment = 'ATTACHMENT',
    secret = 'SECRET',
    text = 'TEXT',

}