import {DownloadFileButton} from "./DownloadFileButton";
import SecretDialog from "./SecretDialog";
import OpenLinkButton from "./OpenLinkButton";
import React from "react";
import {ResourceType} from "../../api/resources/response/ResourceDto";

type ButtonByResourceTypeProps = {
    resourceType: ResourceType,
    value: string,
    id: string
}

function ButtonByResourceType(props: ButtonByResourceTypeProps) {
    switch (props.resourceType) {
        case  'ATTACHMENT': {
            return (<DownloadFileButton>{props.value}</DownloadFileButton>)
        }
        case 'SECRET': {
            return (<SecretDialog>{props.id}</SecretDialog>)
        }
        case 'LINK': {
            return (<OpenLinkButton>{props.value}</OpenLinkButton>)
        }
        case 'TEXT': {
            return (<p>''</p>)
        }
        default: {
            return (<p>''</p>)
        }
    }


}

export default ButtonByResourceType;