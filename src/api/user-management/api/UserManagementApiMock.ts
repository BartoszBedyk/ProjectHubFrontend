import {CreateUserForm} from "../form/CreateUserForm";
import {EditUserForm} from "../form/EditUserForm";
import {UserDto} from "../response/UserDto";
import {UserManagementApi} from "../UserManagementApi";
import {mockTimeout} from "../../ApiUtils";
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";


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
        return mockTimeout(2000).then(() => {
            console.log("User deleted successfully", id);
        });
    }
    search(form: SearchForm): Promise<SearchResponse<UserDto>> {
        const users: UserDto[] = [
            {
                id: "12312",
                firstName: "Kacper",
                lastName: "Koncki",
                email: "test@gmail.com",
                createdOn: new Date(),
                createdById: "111",
                deletedOn: null,
                deletedById: null,
                isBlocked: false
            },
            {
                id: "12313",
                firstName: "Bartosz",
                lastName: "Bedyk",
                email: "bartosz.bedyk@gmail.com",
                createdOn: new Date(),
                createdById: "112",
                deletedOn: null,
                deletedById: null,
                isBlocked: false
            },
            {
                id: "12314",
                firstName: "Kamil",
                lastName: "Smolarek",
                email: "kamil.smolarek@gmail.com",
                createdOn: new Date(),
                createdById: "113",
                deletedOn: null,
                deletedById: null,
                isBlocked: false
            },
        ]

        const filteredUsers = users.filter(user => {
            return form.criteria.every(criteria => {
                const value = user[criteria.fieldName as keyof UserDto];
                switch (criteria.operator) {
                    case "EQUALS":
                        return value === criteria.value;
                    case "LIKE":
                        return typeof value === "string" && value.includes(criteria.value);
                    case "NOT_EQUALS":
                        return value !== criteria.value;
                    default:
                        return true;
                }
            });
        });

        const sortedUsers = filteredUsers.sort((a, b) => {
            const aValue = a[form.sort.by as keyof UserDto];
            const bValue = b[form.sort.by as keyof UserDto];

            if (aValue == null || bValue == null) return 0;

            if (typeof aValue === "string" && typeof bValue === "string") {
                return form.sort.order === "ASC" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            return form.sort.order === "ASC" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
        });

        const paginatedUsers = sortedUsers.slice(form.page * form.size, (form.page + 1) * form.size);

        return mockTimeout(2000).then(() => ({
            items: paginatedUsers,
            total: filteredUsers.length
        }));
    }
}