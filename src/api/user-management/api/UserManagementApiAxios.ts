import { CreateUserForm } from "../form/CreateUserForm";
import { EditUserForm } from "../form/EditUserForm";
import { UserDto } from "../response/UserDto";
import {UserManagementApi} from "../UserManagementApi";

export class UserManagementApiAxios implements UserManagementApi {
    get(id: string): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    save(form: CreateUserForm): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    update(from: EditUserForm): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    block(id: string): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    unblock(id: string): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    search(form: SearchForm): Promise<SearchResponse<UserDto>> {
        throw new Error("Method not implemented.");
    }

}