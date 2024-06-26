import {ActivityTypeDto} from "./ActivityTypeDto";
import {ActivityParamDto} from "./ActivityParamDto";

export interface ActivityDTO {
    id: string;
    createdById: string;
    type: ActivityTypeDto;
    createdOn: string;
    params: ActivityParamDto[];
}