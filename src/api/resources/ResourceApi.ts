import axios from 'axios';
import {ResourceData} from "./form/ResourceForm";
import {authenticate, axiosClientAuth} from "../../AxiosClient";
import ResourcesApiAxios from "./api/ResourcesApiAxios";

const searchRaw = {
    criteria: [
        {
            fieldName: "name",
            value: "name1",  // z zmiennej pobierać później
            operator: "EQUALS"
        }
    ],
    page: "1",
    size: "1",
    searchSort: [
        {
            by: "name",
            order: "ASC"
        }
    ]
};

     const  getResource = async (): Promise<ResourceData[]> => {
        try{
            await authenticate();
            const response = await axiosClientAuth.post('/resources/search', searchRaw);
            return await response.data;
        }
       catch (error) {
            console.error(error);
            throw error;
       }
    }




    export { getResource };
