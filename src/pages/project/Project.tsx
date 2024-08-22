import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { api } from '../../api/AppApi';
import { TechnologyDTO } from '../../api/project/technology/response/TechnologyDTO';
import CustomLayout from "../../components/Layout/Layout";
import { ProjectDTO } from "../../api/project/response/ProjectDTO";
import { useTranslation } from "react-i18next";
import { Role } from '../../api/project/project-member/response/Role';
import ProjectEnvironmentsTable from "../../components/TableImpl/ProjectEnvironmentTable";
import { getUserRole } from "../../components/authComponent";
import {UserDto} from "../../api/user-management/response/UserDto";
import {TIMEOUTS} from "../../utils/timeouts";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";
import ProjectActivitiesTable from "../../components/TableImpl/ProjectActivitiesTable";

const ProjectPageComponent: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [technologies, setTechnologies] = useState<TechnologyDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<UserDto | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('projects');
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (location.state?.showSnackbarCreate) {
            setSnackbarData({open: true, message: t('projectCreatedSuccess'), severity: 'success'});
        }
        if (location.state?.showSnackbarEdit) {
            setSnackbarData({open: true, message: t('projectEditedSuccess'), severity: 'success'});
        }
        if (location.state?.showSnackbarEnvDelete) {
            setSnackbarData({open: true, message: t('envDeletedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectResponse = await api.project.get(projectId!);
                setProject(projectResponse);

                const technologyResponses = await Promise.all(
                    projectResponse.technologies.map((techId: string) => api.technology.findById(techId))
                );
                setTechnologies(technologyResponses);

                if (projectResponse.createdById) {
                    const creatorResponse = await api.userManagement.get(projectResponse.createdById);
                    setCreator(creatorResponse);
                }

                const role = await getUserRole(projectId!);
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleEdit = () => {
        navigate(`/project/edit/${projectId}`);
    };

    const handleDelete = async () => {
        try {
            await api.project.delete(projectId!);
            navigate('/project', { state: { showSnackbarDelete: true } });
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const isOwner = currentUserRole === Role.OWNER;
    const isAdmin = currentUserRole === Role.ADMIN;

    const handleCreateEnvironment = () => {
        navigate(`/project-environment/create/${projectId}`);
    };

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

    if (!project) {
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

    if (project.deletedOn != null && !isAdmin) {
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
                        {project.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2, marginLeft: 3, marginTop: 1 }}>
                    {technologies.map((tech, index) => (
                        <Chip key={index} label={tech.name} sx={{ backgroundColor: '#1976d2', color: '#fff' }} />
                    ))}
                </Box>
                <Box sx={{ padding: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2 }}>
                        {(isOwner || isAdmin) && (
                            <>
                                <Button variant="contained" color="primary" onClick={handleEdit}>
                                    {t('edit')}
                                </Button>
                                <Button variant="contained" color="error" onClick={openDeleteDialog}>
                                    {t('deleteProject')}
                                </Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                            {`${t('created')}: ${new Date(project.createdOn).toLocaleDateString()}`}
                        </Typography>
                        {creator && (
                            <Typography variant="body2" color="textSecondary">
                                {`${t('createdBy')}: ${creator.firstName} ${creator.lastName}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
            {(isOwner || isAdmin) && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, marginRight: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateEnvironment}
                    title={t('createProject')}
                >
                    {t('createEnvironment')}
                </Button>
            </Box>
        )}
            <ProjectEnvironmentsTable projectId={projectId!}/>
            <ProjectActivitiesTable projectId={projectId!}/>
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>{t('confirmDeletion')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('deletionAlert')}
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
            <CustomSnackbar
                open={snackbarData.open}
                onClose={handleSnackbarClose}
                message={snackbarData.message}
                severity={snackbarData.severity}
            />
        </CustomLayout>
    );
};

export default ProjectPageComponent;