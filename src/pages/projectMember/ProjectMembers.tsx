import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectMembersTable from "../../components/TableImpl/ProjectMembersTable";

const ProjectMembers: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();

    const handleAddProjectMembers = () => {
        navigate(`/project-member/create/${projectId}`);
    };
    return (
        <CustomLayout>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProjectMembers}
                >
                    Dodaj uczestnika
                </Button>
            </Box>
            <ProjectMembersTable projectId={projectId!} />
        </CustomLayout>
    );
};

export default ProjectMembers;