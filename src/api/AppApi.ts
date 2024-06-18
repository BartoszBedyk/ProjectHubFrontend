import {ResourcesApi} from "./resources/ResourcesApi";
import {ResourcesApiAxios} from "./resources/api/ResourcesApiAxios";
import {ResourcesApiMock} from "./resources/api/ResourcesApiMock";
import {LoginPassAuthApiAxios} from "./login-pass-auth/api/LoginPassAuthApiAxios";
import {LoginPassAuthApi} from "./login-pass-auth/LoginPassAuthApi";
import {ChangePasswordApi} from "./login-pass-auth/ChangePasswordApi";
import {ProjectEnvironmentApi} from "./project/project-environment/ProjectEnvironmentApi";
import {UserManagementApi} from "./user-management/UserManagementApi";
import {ChangePasswordApiAxios} from "./login-pass-auth/api/ChangePasswordApiAxios";
import {ProjectEnvironmentApiAxios} from "./project/project-environment/api/ProjectEnvironmentApiAxios";
import {UserManagementApiAxios} from "./user-management/api/UserManagementApiAxios";
import {ChangePasswordApiMock} from "./login-pass-auth/api/ChangePasswordApiMock";

interface AppApi {
    loginPassAuth: LoginPassAuthApi;
    changePassword: ChangePasswordApi;
    projectEnvironment: ProjectEnvironmentApi;
    userManagement: UserManagementApi;
    resources: ResourcesApi;
}

const axiosApi: AppApi = {
    loginPassAuth: new LoginPassAuthApiAxios(),
    changePassword: new ChangePasswordApiAxios(),
    projectEnvironment: new ProjectEnvironmentApiAxios(),
    userManagement: new UserManagementApiAxios(),
    resources: new ResourcesApiAxios(),
}

const mockApi: AppApi = {
    loginPassAuth: new LoginPassAuthApiAxios(),
    changePassword: new ChangePasswordApiMock(),
    projectEnvironment: new ProjectEnvironmentApiAxios(),
    userManagement: new UserManagementApiAxios(),
    resources: new ResourcesApiMock()
}

const isProd = true;

const api = isProd ? axiosApi : mockApi;
export {
    api
};