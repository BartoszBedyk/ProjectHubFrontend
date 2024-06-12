import { CreateUserForm } from "../form/CreateUserForm";
import { EditUserForm } from "../form/EditUserForm";
import { UserDto } from "../response/UserDto";
import {UserManagementApi} from "../UserManagementApi";
import {mockTimeout} from "../../ApiUtils";

export class UserManagementApiMock implements UserManagementApi {
    get(id: string): Promise<UserDto> {
        return mockTimeout(2000).then(() => ({
            id: "12312",
            firstName: "Kacper",
            lastName: "Koncki",
            email: "test@gmail.com",
            createdOn: new Date(),
            createdById: "111",
            deletedOn: null,
            deletedById: null,
            isBlocked: false
        }))
    }
    save(form: CreateUserForm): Promise<UserDto> {
        return mockTimeout(2000).then(() => ({
            id: "12312",
            firstName: "Kacper",
            lastName: "Koncki",
            email: "test@gmail.com",
            createdOn: new Date(),
            createdById: "111",
            deletedOn: null,
            deletedById: null,
            isBlocked: false
        }))
    }
    update(from: EditUserForm): Promise<UserDto> {
        return mockTimeout(2000).then(() => ({
            id: "12312",
            firstName: "Kacper",
            lastName: "Koncki",
            email: "test@gmail.com",
            createdOn: new Date(),
            createdById: "111",
            deletedOn: null,
            deletedById: null,
            isBlocked: false
        }))
    }
    block(id: string): Promise<UserDto> {
        return mockTimeout(2000).then(() => ({
            id: "12312",
            firstName: "Kacper",
            lastName: "Koncki",
            email: "test@gmail.com",
            createdOn: new Date(),
            createdById: "111",
            deletedOn: null,
            deletedById: null,
            isBlocked: false
        }))
    }
    unblock(id: string): Promise<UserDto> {
        return mockTimeout(2000).then(() => ({
            id: "12312",
            firstName: "Kacper",
            lastName: "Koncki",
            email: "test@gmail.com",
            createdOn: new Date(),
            createdById: "111",
            deletedOn: null,
            deletedById: null,
            isBlocked: false
        }))
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    search(form: SearchForm): Promise<SearchResponse<UserDto>> {
        throw new Error("Method not implemented.");
    }

}