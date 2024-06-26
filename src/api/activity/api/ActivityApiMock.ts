import {SearchForm} from "../../../forms/SearchForm";
import {SearchResponse} from "../../../forms/SearchResponse";
import {ActivityApi} from "../ActivityApi";
import {ActivityDTO} from "../response/ActivityDto";
import {ActivityTypeDto} from "../response/ActivityTypeDto";

export class ActivityApiMock implements ActivityApi {
    async search(searchForm: SearchForm): Promise<SearchResponse<ActivityDTO>> {
        return {
            items: [
                {
                    id: '1',
                    createdById: 'user1',
                    type: ActivityTypeDto.CREATE_USER,
                    createdOn: new Date().toISOString(),
                    params: [
                        { name: 'userId', value: '123' },
                        { name: 'firstName', value: 'John' },
                        { name: 'lastName', value: 'Doe' },
                    ],
                },
                {
                    id: '2',
                    createdById: 'user2',
                    type: ActivityTypeDto.DELETE_USER,
                    createdOn: new Date().toISOString(),
                    params: [
                        { name: 'userId', value: '124' },
                        { name: 'firstName', value: 'Jane' },
                        { name: 'lastName', value: 'Smith' },
                    ],
                },
            ],
            total: 2,
        };
    }
}