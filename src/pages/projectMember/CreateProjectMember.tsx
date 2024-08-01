import CustomLayout from "../../components/Layout/Layout";
import CreateProjectMemberFormComponent from "../../forms/projectMember/CreateProjectMemberFormComponent";
import {useParams} from "react-router-dom";

function CreateProjectMember () {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <CustomLayout>
            <CreateProjectMemberFormComponent projectId={projectId!}/>
        </CustomLayout>
    )
}

export default CreateProjectMember;