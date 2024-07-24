import React from 'react';
import { useParams } from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import UpdateProjectFormComponent from "../../forms/project/UpdateProjectFormComponent";

const UpdateProject: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <CustomLayout>
            <UpdateProjectFormComponent projectId={projectId!} />
        </CustomLayout>
    );
}

export default UpdateProject;