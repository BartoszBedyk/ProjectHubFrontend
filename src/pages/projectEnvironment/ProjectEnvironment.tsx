import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    DialogTitle
} from '@mui/material';
import { api } from '../../api/AppApi';
import CustomLayout from "../../components/Layout/Layout";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import { useTranslation } from "react-i18next";
import { Role } from '../../api/project/project-member/response/Role';
import { getUserId } from "../../storage/AuthStorage";
import {ProjectEnvironmentDto} from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import {getUserRole} from "../../components/authComponent";

const ProjectEnvironmentPageComponent: React.FC = () => {
    const { environmentId } = useParams<{ environmentId: string }>();
    const [environment, setEnvironment] = useState<ProjectEnvironmentDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('environments');
    const [isProjectDeleted, setIsProjectDeleted] = useState(false);


    useEffect(() => {
        const fetchEnvironmentDetails = async () => {
            try {
                const environmentResponse = await api.projectEnvironment.findById(environmentId!);
                setEnvironment(environmentResponse);

                const role = await getUserRole(environmentResponse.projectId);

                const projectResponse = await api.project.get(environmentResponse.projectId);
                if(projectResponse.deletedOn != null){
                    setIsProjectDeleted(true)
                }
                setCurrentUserRole(role);

            } catch (error) {
                console.error('Error fetching environment details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnvironmentDetails();
    }, [environmentId]);

    const handleEdit = () => {
        navigate(`/project-environment/edit/${environmentId}`);
    };

    const handleDelete = async () => {
        try {
            const environmentResponse = await api.projectEnvironment.findById(environmentId!);
            await api.projectEnvironment.delete(environmentId!);
            navigate(`/project/${environmentResponse.projectId}`);
        } catch (error) {
            console.error('Error deleting environment:', error);
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

    if (!environment) {
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
                        {environment.name}
                    </Typography>
                </Box>
                <Box sx={{ padding: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        {`${t('isEncrypted')}: ${environment.encrypted ? t('yes') : t('no')}`}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2 }}>
                        {(isOwner || isAdmin) && (
                            <>
                                <Button variant="contained" color="primary" onClick={handleEdit}>
                                    {t('edit')}
                                </Button>
                                <Button variant="contained" color="error" onClick={openDeleteDialog}>
                                    {t('deleteEnvironment')}
                                </Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                            {`${t('created')}: ${new Date(environment.createdOn).toLocaleDateString()}`}
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
        </CustomLayout>
    );
};

export default ProjectEnvironmentPageComponent;