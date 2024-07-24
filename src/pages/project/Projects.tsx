import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
} from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectsTable from "../../components/TableImpl/ProjectsTable";

const Projects: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateProject = () => {
        navigate('/project/create');
    };

    return (
        <CustomLayout>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3  }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateProject}
                    >
                        Nowy projekt
                    </Button>
                </Box>
                <ProjectsTable searchValue="" />
        </CustomLayout>
    );
};

export default Projects;