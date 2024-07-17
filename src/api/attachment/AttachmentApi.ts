import {AttachmentDto} from "./response/AttachmentDto";

export interface AttachmentApi {
    upload(file: File): Promise<AttachmentDto>
    download(id: string): Promise<Blob>
}