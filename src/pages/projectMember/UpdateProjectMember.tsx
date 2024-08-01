import CustomLayout from "../../components/Layout/Layout";
import {useParams} from "react-router-dom";
import UpdateProjectMemberFormComponent from "../../forms/projectMember/UpdateProjectMemberFormComponent";

function UpdateProjectMember () {
    const { projectId, userId } = useParams<{ projectId: string, userId: string }>();

    return (
        <CustomLayout>
            <UpdateProjectMemberFormComponent projectId={projectId!} userId={userId!}/>
        </CustomLayout>
    )
}

export default UpdateProjectMember;