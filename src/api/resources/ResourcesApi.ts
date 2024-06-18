import {ResourceDto} from "./response/ResourceDto";

export interface ResourcesApi {
    get(): Promise<ResourceDto>
}