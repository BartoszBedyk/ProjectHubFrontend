import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { Box, Button, Container, Typography, CircularProgress } from '@mui/material';
import CustomLayout from "../../components/Layout/Layout";
import ProjectMembersTable from "../../components/TableImpl/ProjectMembersTable";
import { useTranslation } from "react-i18next";
import { Role } from "../../api/project/project-member/response/Role";
import { getUserRole } from "../../components/authComponent";
import { api } from '../../api/AppApi';
import {TIMEOUTS} from "../../utils/timeouts";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";

const ProjectMembers: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const { t } = useTranslation('members');
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [isProjectDeleted, setIsProjectDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (location.state?.showSnackbarDelete) {
            setSnackbarData({open: true, message: t('memberDeletedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                if (projectId) {
                    const role = await getUserRole(projectId);
                    setCurrentUserRole(role);

                    const projectResponse = await api.project.get(projectId);
                    if (projectResponse.deletedOn != null) {
                        setIsProjectDeleted(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleAddProjectMembers = () => {
        navigate(`/project-member/create/${projectId}`);
    };

    const isAdmin = currentUserRole === Role.ADMIN;
    const isOwner = currentUserRole === Role.OWNER;

    if (loading) {
        return (
            <CustomLayout>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </CustomLayout>
        );
    }

    if (isProjectDeleted && !isAdmin) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('deleted')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    if (currentUserRole === null) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('noAccess')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    return (
        <CustomLayout>
            {(isAdmin || (!isProjectDeleted && isOwner)) ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProjectMembers}
                    >
                        {t('addMember')}
                    </Button>
                </Box>
            ) : null}
            <ProjectMembersTable projectId={projectId!} />
            <CustomSnackbar
                open={snackbarData.open}
                onClose={handleSnackbarClose}
                message={snackbarData.message}
                severity={snackbarData.severity}
            />
        </CustomLayout>
    );
};

export default ProjectMembers;
