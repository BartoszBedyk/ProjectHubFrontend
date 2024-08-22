import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Box, Button, CircularProgress, Container, Icon, Paper, Typography} from '@mui/material';
import {api} from '../../api/AppApi';
import CustomLayout from "../../components/Layout/Layout";
import {ProjectMemberDto} from "../../api/project/project-member/response/ProjectMemberDto";
import {useTranslation} from "react-i18next";
import {ResourceDto, ResourceType} from "../../api/resources/response/ResourceDto";
import EditIcon from '@mui/icons-material/Edit';
import ButtonByResourceType from "../../components/TableImpl/ButtonByResourceType";
import DeleteDialog from "../../components/dialogs/DeleteDialog";
import DeleteButton from "../../components/TableImpl/DeleteButton";
import {Role} from "../../api/project/project-member/response/Role";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {getUserRole} from "../../components/authComponent";
import {TIMEOUTS} from "../../utils/timeouts";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";

const ProjectPageComponent: React.FC = () => {
    const {resourceId, projectId} = useParams<{ resourceId: string, projectId: string }>();
    const [resource, setResource] = useState<ResourceDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const navigate = useNavigate();
    const {t} = useTranslation('overall')
    const [open, setOpen] = React.useState(false);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (location.state?.showSnackbarEdit) {
            setSnackbarData({open: true, message: t('resources.resourceEditedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
    };


    const openDeleteDialog = () => {
        setOpen(true)
    }

    const closeDeleteDialog = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.resources.get(resourceId!);
                setResource(response);

                const projectResponse = await api.project.get(projectId!);
                setProject(projectResponse);

                const role = await getUserRole(projectId!);
                setCurrentUserRole(role);

                if (response.createdById) {
                    const creatorResponse = await api.projectMember.getByIds(response.createdById, projectId!);
                    setCreator(creatorResponse);
                }
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [resourceId]);

    const handleEdit = () => {
        navigate(`/project/${projectId}/resources/edit/${resourceId}`);
    };

    const isAdmin = currentUserRole === Role.ADMIN;

    if (loading) {
        return (
            <CustomLayout>
                <Container>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress/>
                    </Box>
                </Container>
            </CustomLayout>
        );
    }

    if (!resource) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{mt: 4}}>
                        {t('resources.notFound')}
                    </Typography>
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
                        {t('resources.notFound2')}
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
                        {t('resources.deleted')}
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
                        {t('resources.noAccess')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    const handleDelete = () => {
        api.resources.delete(resourceId!).then(r => console.log(r))
        navigate(`/project/${projectId}/resources/any`, { state: { showSnackbarDelete: true } });
    }

    return (
        <CustomLayout>

            <Paper sx={{width: 'auto', mb: 2, margin: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2}}>
                    <Box sx={{width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2}}/>
                    <Typography variant="h5" component="div">
                        {resource.name}
                    </Typography>


                </Box>
                <DeleteDialog open={open} dialogTitle={t('resources.deleteResource')}
                              dialogText={t('resources.deleteResourceMessage')}
                              handleDelete={handleDelete}></DeleteDialog>
                <Box sx={{padding: 3}}>
                    <Typography variant="body1" gutterBottom>
                        {t('forms.value')} {resource.value}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t('forms.description')} {resource.description}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2}}>
                            <ButtonByResourceType id={resource.id} resourceType={resource.resourceType}
                                                  value={resource.value}/>

                        {currentUserRole != Role.VISITOR && currentUserRole != null && (
                            <>
                                <Button variant="contained" color="primary" onClick={handleEdit}
                                        title={t('forms.edit')}>
                                    <Icon
                                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <EditIcon>
                                        </EditIcon>
                                    </Icon>
                                </Button>
                                <DeleteButton openDialog={openDeleteDialog}/>
                            </>
                        )}

                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>

                        <Typography variant="body2" color="textSecondary">
                            {`${t('forms.creationDate')}: ${new Date(resource.createdOn).toLocaleDateString()}   `}
                            {resource.lastModifiedOn && (
                                `${t('forms.modifyDate')}: ${new Date(resource.lastModifiedOn).toLocaleDateString()}`
                                )}
                        </Typography>


                        {creator && (
                            <Typography variant="body2" color="textSecondary">
                                {`${t('forms.createdBy')}: ${creator.firstName} ${creator.lastName}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
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
