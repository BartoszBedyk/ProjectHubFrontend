import {AttachmentApi} from "../AttachmentApi";
import {AttachmentDto} from "../response/AttachmentDto";
import {axiosInstance} from "../../../AxiosClient";

export class AttachmentApiAxios implements AttachmentApi {
    upload(file: File): Promise<AttachmentDto> {
        return axiosInstance.post<AttachmentDto>('/attachment/upload', file)
            .then(response => response.data)
            .catch(error => {
                console.error('Error uploading file:', error);
                throw error;
            });
    }
    download(id: string): Promise<Blob|any> {
        return axiosInstance.get<Blob>(`/attachment/download/${id}`, {responseType : 'blob'})
            .then(response => response)
            .catch(error => {
                console.error('Error downloading file:', error);
                throw error;
            });
    }
}