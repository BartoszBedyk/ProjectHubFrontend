import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button, Icon,
} from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectsTable from "../../components/TableImpl/ProjectsTable";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {useTranslation} from "react-i18next";

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('projects');

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
                        title={t('createProject')}
                    >
                        <Icon
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <NoteAddIcon></NoteAddIcon>
                        </Icon>
                    </Button>
                </Box>
                <ProjectsTable searchValue="" />
        </CustomLayout>
    );
};

export default Projects;