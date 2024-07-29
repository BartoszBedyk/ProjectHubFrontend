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

const ProjectMemberPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { userId } = useParams<{ userId: string }>();

    const [projectMember, setProjectMember] = useState<ProjectMemberDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectMemberDetails = async () => {
            try {
                const response = await api.projectMember.getByIds(userId! ,projectId!);
                setProjectMember(response);


                if (response.createdById) {
                    const creatorResponse = await api.projectMember.getByIds(response.createdById, projectId!);
                    setCreator(creatorResponse);
                }
            } catch (error) {
                console.error('Error fetching project member details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectMemberDetails();
    }, [projectId]);

    const handleEdit = () => {
        navigate(`/project-member/edit/${projectId}/${userId}`);
    };

    const handleDelete = async () => {
        try {
            await api.projectMember.delete(projectId!, userId!);
            navigate('/project');
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
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        Project member not found
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edytuj uczestnika
                        </Button>
                        <Button variant="contained" color="error" onClick={openDeleteDialog}>
                            Usuń uczestnika
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                            {`Utworzono: ${new Date(projectMember.createdOn).toLocaleDateString()}`}
                        </Typography>
                        {creator && (
                            <Typography variant="body2" color="textSecondary">
                                {`Utworzony przez: ${creator.firstName} ${creator.lastName}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Potwierdź usunięcie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć tego uczestnika? Tej operacji nie można cofnąć.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
        </CustomLayout>
    );
};

export default ProjectMemberPage;