import React, {useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {UpdateResourceFormComponent} from "../../forms/resources/UpdateResourceFormComponent";
import {useParams} from "react-router-dom";
import {Role} from "../../api/project/project-member/response/Role";
import AuthComponent from "../../components/authComponent";
import NoAccessHandler from "../../components/NoAccesHandler";




function UpdateResource() {

    let { projectId, resourceId } = useParams<{ projectId: string; resourceId: string }>();
    const [role, setRole] = useState<Role | null>(null)
    AuthComponent(projectId!).then(r => setRole(r))

    if (role === null) {

        return (<NoAccessHandler data={role}/>)
    }

    return (
        <CustomLayout>
            <UpdateResourceFormComponent resourceId={resourceId!} projectId={projectId!} ></UpdateResourceFormComponent>
        </CustomLayout>
    );
}

export default UpdateResource;