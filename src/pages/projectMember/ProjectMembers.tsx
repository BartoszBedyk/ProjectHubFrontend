import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectMembersTable from "../../components/TableImpl/ProjectMembersTable";
import { useTranslation } from "react-i18next";
import { api } from "../../api/AppApi";
import { Role } from "../../api/project/project-member/response/Role";
import { getUserId } from "../../storage/AuthStorage";

const ProjectMembers: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const { t } = useTranslation('members');
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);

    useEffect(() => {
        const fetchCurrentUserRole = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId && projectId) {
                    const currentUserResponse = await api.projectMember.getByIds(currentUserId, projectId);
                    setCurrentUserRole(currentUserResponse.role);
                }
            } catch (error) {
                console.error('Error fetching current user role:', error);
            }
        };

        fetchCurrentUserRole();
    }, [projectId]);

    const handleAddProjectMembers = () => {
        navigate(`/project-member/create/${projectId}`);
    };

    return (
        <CustomLayout>
            {currentUserRole === Role.OWNER && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProjectMembers}
                    >
                        {t('addMember')}
                    </Button>
                </Box>
            )}
            <ProjectMembersTable projectId={projectId!} />
        </CustomLayout>
    );
};

export default ProjectMembers;