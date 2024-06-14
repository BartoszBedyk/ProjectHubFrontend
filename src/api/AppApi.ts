import {ResourcesApi} from "./resources/ResourcesApi";
import {ResourcesApiAxios} from "./resources/api/ResourcesApiAxios";
import {ResourcesApiMock} from "./resources/api/ResourcesApiMock";

interface AppApi {
    resources: ResourcesApi
}

const axiosApi: AppApi = {
    resources: new ResourcesApiAxios()
}

const mockApi: AppApi = {
    resources: new ResourcesApiMock()
}

const isProd = true;

const api = isProd ? axiosApi : mockApi;
export {
    api
};