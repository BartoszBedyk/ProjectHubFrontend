import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Box,
    Button, Icon,
} from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectsTable from "../../components/TableImpl/ProjectsTable";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {useTranslation} from "react-i18next";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('projects');
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleCreateProject = () => {
        navigate('/project/create');
    };

    useEffect(() => {
        if (location.state?.showSnackbarDelete) {
            setSnackbarData({open: true, message: t('projectDeletedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
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
            <CustomSnackbar
                open={snackbarData.open}
                onClose={handleSnackbarClose}
                message={snackbarData.message}
                severity={snackbarData.severity}
            />
        </CustomLayout>
    );
};

export default Projects;