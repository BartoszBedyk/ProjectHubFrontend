import {CreateUserForm} from "./form/CreateUserForm";
import {EditUserForm} from "./form/EditUserForm";
import {UserDto} from "./response/UserDto";

export interface UserManagementApi {
    get(id: string): Promise<UserDto>;
    save(form: CreateUserForm): Promise<UserDto>;
    update(from: EditUserForm): Promise<UserDto>;
    block(id: string): Promise<UserDto>;
    unblock(id: string): Promise<UserDto>;
    delete(id: string): Promise<void>;
    search(form: SearchForm): Promise<SearchResponse<UserDto>>;
}