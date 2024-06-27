import {AttachmentApi} from "../AttachmentApi";
import {AttachmentDto} from "../response/AttachmentDto";
import {mockTimeout} from "../../ApiUtils";

export class AttachmentApiMock implements AttachmentApi {
    upload(file: File): Promise<AttachmentDto> {
        return mockTimeout(1000).then(() => ({
            id: "7dd8f546-1238-4aab-88da-bd67442d5cff",
            name: "Attachment",
            path: "/attachments",
            createdOn: new Date(),
            createdById: "2f50e66b-fd01-485c-9a96-ac043811864b"
        }));
    }
    download(id: string): Promise<Blob> {
        return mockTimeout(1000).then(() => {
            const mockFileContent = 'This is a mock file.'
            return new Blob([mockFileContent], { type: 'text/plain' });
        });
    }

}