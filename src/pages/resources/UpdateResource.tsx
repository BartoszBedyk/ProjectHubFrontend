import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {UpdateResourceFormComponent} from "../../forms/resources/UpdateResourceFormComponent";
import {useParams} from "react-router-dom";




function UpdateResource() {

    let { projectId, resourceId } = useParams<{ projectId: string; resourceId: string }>();

    return (
        <CustomLayout>
            <UpdateResourceFormComponent resourceId={resourceId!} projectId={projectId!} ></UpdateResourceFormComponent>
        </CustomLayout>
    );
}

export default UpdateResource;