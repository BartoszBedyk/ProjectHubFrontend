import {useParams} from "react-router-dom";
import CustomLayout from "../../components/Layout/Layout";
import React, {useState} from "react";

import {CreateResourceFormComponent} from "../../forms/resources/CreateResourceFormComponent";
import {Role} from "../../api/project/project-member/response/Role";
import AuthComponent from "../../components/authComponent";
import NoAccessHandler from "../../components/NoAccesHandler";

export function CreateResource() {
    let {projectId} = useParams();
    let {environmentId} = useParams();

    const [role, setRole] = useState<Role | null>(null)
    AuthComponent(projectId!).then(r => setRole(r))
    if (role === null) {
        return (<NoAccessHandler data={role}/>)
    }

    return (
        <CustomLayout>
            <CreateResourceFormComponent projectId={projectId!}
                                         environmentId={environmentId!}></CreateResourceFormComponent>
        </CustomLayout>
    );
}