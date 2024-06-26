import {AttachmentApi} from "../AttachmentApi";
import {AttachmentDto} from "../response/AttachmentDto";

export class AttachmentApiAxios implements AttachmentApi {
    upload(file: File): Promise<AttachmentDto> {
        throw new Error("Method not implemented.");
    }
    download(id: string): Promise<Blob> {
        throw new Error("Method not implemented.");
    }
}