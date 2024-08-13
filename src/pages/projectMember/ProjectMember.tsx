import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { api } from '../../api/AppApi';
import CustomLayout from "../../components/Layout/Layout";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import { Role } from '../../api/project/project-member/response/Role';
import { ProjectEnvironmentDto } from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import { getUserId } from "../../storage/AuthStorage";
import {getUserRole} from "../../components/authComponent";
import {TIMEOUTS} from "../../utils/timeouts";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";

const ProjectMemberPage: React.FC = () => {
    const { projectId, userId } = useParams<{ projectId: string; userId: string }>();
    const [projectMember, setProjectMember] = useState<ProjectMemberDto | null>(null);
    const [environments, setEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('members');
    const [isProjectDeleted, setIsProjectDeleted] = useState(false);
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (location.state?.showSnackbarCreate) {
            setSnackbarData({open: true, message: t('memberCreatedSuccess'), severity: 'success'});
        }
        if (location.state?.showSnackbarEdit) {
            setSnackbarData({open: true, message: t('memberEditedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
    };


    useEffect(() => {
        const fetchProjectMemberDetails = async () => {
            try {
                const response = await api.projectMember.getByIds(userId!, projectId!);
                setProjectMember(response);

                if (response.createdById) {
                    const creatorResponse = await api.projectMember.getByIds(response.createdById, projectId!);
                    setCreator(creatorResponse);
                }

                if (response.environmentIds && response.environmentIds.length > 0) {
                    const environmentPromises = response.environmentIds.map((envId) =>
                        api.projectEnvironment.findById(envId)
                    );
                    const envResponses = await Promise.all(environmentPromises);
                    setEnvironments(envResponses);
                }

                const role = await getUserRole(projectId!);

                const projectResponse = await api.project.get(projectId!);

                if(projectResponse.deletedOn != null){
                    setIsProjectDeleted(true)
                }
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching project member details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectMemberDetails();
    }, [projectId, userId]);

    const handleEdit = () => {
        navigate(`/project-member/edit/${projectId}/${userId}`);
    };

    const handleDelete = async () => {
        const currentUserId = getUserId();
        if (currentUserId === userId) {
            setErrorDialogOpen(true);
            return;
        }
        try {
            await api.projectMember.delete(projectId!, userId!);
            navigate(`/project-member/${projectId}`, { state: { showSnackbarDelete: true } });
        } catch (error) {
            console.error('Error deleting project member:', error);
        }
    };

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const closeErrorDialog = () => {
        setErrorDialogOpen(false);
    };

    const isOwner = currentUserRole === Role.OWNER;
    const isAdmin = currentUserRole === Role.ADMIN;

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

    if (!projectMember) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('notFound')}
                    </Typography>
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
            <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                    <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                    <Typography variant="h5" component="div">
                        {projectMember.firstName} {projectMember.lastName}
                    </Typography>
                </Box>
                <Box sx={{ padding: 3 }}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        {t('role')}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {projectMember.role}
                    </Typography>

                    {environments.length > 0 && (
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {t('environments')}
                            </Typography>
                            <List>
                                {environments.map((env, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={env.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2 }}>
                        {(isOwner || isAdmin) && (
                            <>
                                <Button variant="contained" color="primary" onClick={handleEdit}>
                                    {t('editMember')}
                                </Button>
                                <Button variant="contained" color="error" onClick={openDeleteDialog}>
                                    {t('deleteMember')}
                                </Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                            {`${t('createdOn')}: ${new Date(projectMember.createdOn).toLocaleDateString()}`}
                        </Typography>
                        {creator && (
                            <Typography variant="body2" color="textSecondary">
                                {`${t('createdBy')}: ${creator.firstName} ${creator.lastName}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>{t('confirmDelete')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('confirmDelete')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={errorDialogOpen} onClose={closeErrorDialog}>
                <DialogTitle>{t('error')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('cannotDeleteSelf')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorDialog} color="primary">
                        {t('ok')}
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnackbar
                open={snackbarData.open}
                onClose={handleSnackbarClose}
                message={snackbarData.message}
                severity={snackbarData.severity}
            />
        </CustomLayout>
    );
};

export default ProjectMemberPage;