import { CreateUserForm } from "../form/CreateUserForm";
import { EditUserForm } from "../form/EditUserForm";
import { UserDto } from "../response/UserDto";
import {UserManagementApi} from "../UserManagementApi";
import {axiosInstance} from "../../../AxiosClient";
import {SearchForm} from "../../../commons/Search/SearchForm";
import {SearchResponse} from "../../../commons/Search/SearchResponse";

export class UserManagementApiAxios implements UserManagementApi {
    get(id: string): Promise<UserDto> {
        return axiosInstance.get<UserDto>(`/user-management/${id}`)
            .then(response => response.data);
    }
    save(form: CreateUserForm): Promise<UserDto> {
        return axiosInstance.post<UserDto>(`/user-management/save`, form)
            .then(response => response.data);
    }
    update(form: EditUserForm): Promise<UserDto> {
        return axiosInstance.put<UserDto>(`/user-management/update`, form)
            .then(response => response.data);
    }
    block(id: string): Promise<UserDto> {
        return axiosInstance.put<UserDto>(`/user-management/block/${id}`)
            .then(response => response.data);
    }
    unblock(id: string): Promise<UserDto> {
        return axiosInstance.put<UserDto>(`/user-management/unblock/${id}`)
            .then(response => response.data);
    }
    delete(id: string): Promise<void> {
        return axiosInstance.delete(`/user-management/delete/${id}`)
            .then(() => {});
    }
    search(form: SearchForm): Promise<SearchResponse<UserDto>> {
        return axiosInstance.post<SearchResponse<UserDto>>(`/user-management/search`, form)
            .then(response => response.data);
    }
}