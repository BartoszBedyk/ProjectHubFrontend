import {useParams} from "react-router-dom";
import CustomLayout from "../../components/Layout/Layout";
import React from "react";

import {CreateResourceFormComponent} from "../../forms/resources/CreateResourceFormComponent";

export function CreateResource() {
    let {projectId} = useParams();
    let {environmentId} = useParams();

    return (
        <CustomLayout>
            <CreateResourceFormComponent projectId={projectId!}
                                         environmentId={environmentId!}></CreateResourceFormComponent>
        </CustomLayout>
    );
}