import React from 'react';
import { useParams } from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import UpdateProjectFormComponent from "../../forms/project/UpdateProjectFormComponent";
import UpdateProjectEnvironmentFormComponent
    from "../../forms/projectEnvironment/UpdateProjectEnvironmentFormComponent";

const UpdateProjectEnvironment: React.FC = () => {
    const { environmentId } = useParams<{ environmentId: string }>();

    return (
        <CustomLayout>
            <UpdateProjectEnvironmentFormComponent environmentId={environmentId!} />
        </CustomLayout>
    );
}

export default UpdateProjectEnvironment;