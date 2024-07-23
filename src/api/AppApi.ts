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
import {AttachmentApi} from "./attachment/AttachmentApi";
import {ProjectMemberApi} from "./project/project-member/ProjectMemberApi";
import {ProjectApi} from "./project/ProjectApi";
import {ActivityApi} from "./activity/ActivityApi";
import {AttachmentApiAxios} from "./attachment/api/AttachmentApiAxios";
import {ProjectMemberApiAxios} from "./project/project-member/api/ProjectMemberApiAxios";
import {ProjectApiAxios} from "./project/api/ProjectApiAxios";
import {ActivityApiAxios} from "./activity/api/ActivityApiAxios";
import {AttachmentApiMock} from "./attachment/api/AttachmentApiMock";
import {ProjectMemberApiMock} from "./project/project-member/api/ProjectMemberApiMock";
import {ProjectApiMock} from "./project/api/ProjectApiMock";
import {ActivityApiMock} from "./activity/api/ActivityApiMock";
import {TechnologyApi} from "./project/technology/TechnologyApi";
import {TechnologyApiAxios} from "./project/technology/api/TechnologyApiAxios";
import {TechnologyApiMock} from "./project/technology/api/TechnologyApiMock";

interface AppApi {
    loginPassAuth: LoginPassAuthApi;
    changePassword: ChangePasswordApi;
    projectEnvironment: ProjectEnvironmentApi;
    userManagement: UserManagementApi;
    resources: ResourcesApi;
    attachment: AttachmentApi;
    projectMember: ProjectMemberApi;
    project: ProjectApi;
    activity: ActivityApi;
    technology: TechnologyApi;
}

const axiosApi: AppApi = {
    loginPassAuth: new LoginPassAuthApiAxios(),
    changePassword: new ChangePasswordApiAxios(),
    projectEnvironment: new ProjectEnvironmentApiAxios(),
    userManagement: new UserManagementApiAxios(),
    resources: new ResourcesApiAxios(),
    attachment: new AttachmentApiAxios(),
    projectMember: new ProjectMemberApiAxios(),
    project: new ProjectApiAxios(),
    activity: new ActivityApiAxios(),
    technology: new TechnologyApiAxios(),
}

const mockApi: AppApi = {
    loginPassAuth: new LoginPassAuthApiAxios(),
    changePassword: new ChangePasswordApiMock(),
    projectEnvironment: new ProjectEnvironmentApiAxios(),
    userManagement: new UserManagementApiAxios(),
    resources: new ResourcesApiMock(),
    attachment: new AttachmentApiMock(),
    projectMember: new ProjectMemberApiMock(),
    project: new ProjectApiMock(),
    activity: new ActivityApiMock(),
    technology: new TechnologyApiMock(),
}

const isProd = true;

const api = isProd ? axiosApi : mockApi;
export {
    api
};