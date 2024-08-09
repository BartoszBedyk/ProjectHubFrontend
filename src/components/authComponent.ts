import { useNavigate } from "react-router-dom";
import { getUserId } from "../storage/AuthStorage";
import { api } from "../api/AppApi";
import { Role } from "../api/project/project-member/response/Role";

const AuthComponent = async (projectId: string): Promise<Role | null> => {
    const currentUserId = getUserId();
    const navigate = useNavigate();

    if (currentUserId) {
        try {
            const currentUserResponse = await api.projectMember.getByIds(currentUserId, projectId);
            if (currentUserResponse.role) {
                return currentUserResponse.role;
            } else {
                setTimeout(() => {navigate("/")}, 2000)
                navigate(-1);
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            setTimeout(() => {navigate("/")}, 2000)
        }
    } else {
        setTimeout(() => {navigate("/")}, 2000)
        throw new Error("User ID not found");
    }
    return null;
};

export const getUserRole = async (projectId: string): Promise<Role | null> => {
    const currentUserId = getUserId();
    console.log("Current User ID:", currentUserId);

    if (!currentUserId) {
        console.error("User ID not found");
        return null;
    }

    try {
        const userDetails = await api.userManagement.get(currentUserId);

        if (userDetails.createdById === 'SYSTEM') {
            return Role.ADMIN;
        }

        const currentUserResponse = await api.projectMember.getByIds(currentUserId, projectId);

        if (currentUserResponse.role) {
            return currentUserResponse.role;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default AuthComponent;
