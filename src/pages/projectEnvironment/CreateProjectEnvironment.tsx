import CustomLayout from "../../components/Layout/Layout";
import CreateProjectEnvironmentFormComponent
    from "../../forms/projectEnvironment/CreateProjectEnvironmentFormComponent";
import {useParams} from "react-router-dom";

function CreateProjectEnvironment () {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <CustomLayout>
            <CreateProjectEnvironmentFormComponent projectId={projectId!}/>
        </CustomLayout>
    )
}

export default CreateProjectEnvironment;