import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {useTranslation} from "react-i18next";

const ProjectPageComponent: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [technologies, setTechnologies] = useState<TechnologyDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation('projects')

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
                    const creatorResponse = await api.projectMember.getByIds(projectResponse.createdById, projectId!);
                    setCreator(creatorResponse);
                }
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
            navigate('/project');
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
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            {t('edit')}
                        </Button>
                        <Button variant="contained" color="error" onClick={openDeleteDialog}>
                            {t('deleteProject')}
                        </Button>
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

export default ProjectPageComponent;
