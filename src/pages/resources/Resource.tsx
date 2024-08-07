import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
import AuthComponent from "../../components/authComponent";
import NoAccessHandler from "../../components/NoAccesHandler";


const ProjectPageComponent: React.FC = () => {
    const {resourceId, projectId} = useParams<{ resourceId: string, projectId: string }>();
    const [resource, setResource] = useState<ResourceDto | null>(null);

    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const navigate = useNavigate();
    const {t} = useTranslation('overall')
    const [open, setOpen] = React.useState(false);

    const [role, setRole] = useState<Role | null>(null)
    AuthComponent(projectId!).then(r => setRole(r))


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

                if (response.createdById) {
                    const creatorResponse = await api.projectMember.getByIds(response.createdById, resourceId!);
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

    if (role === null) {

        return (<NoAccessHandler data={role}/>)
    }

    if (!resource) {
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{mt: 4}}>
                        {t('projects.notFound')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    const handleDelete = () => {
        api.resources.delete(resourceId!).then(r => console.log(r))
        navigate(`/project/${projectId}/resources/any`);
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
                        {resource.resourceType !== ResourceType.text && (
                            <ButtonByResourceType id={resource.id} resourceType={resource.resourceType}
                                                  value={resource.value}/>)}

                        {role != Role.VISITOR && role != null && (
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
                            {`${t('forms.modifyDate')}: ${new Date(resource.lastModifiedOn).toLocaleDateString()}`}
                        </Typography>
                        {creator && (
                            <Typography variant="body2" color="textSecondary">
                                {`${t('forms.createdBy')}: ${creator.firstName} ${creator.lastName}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
        </CustomLayout>
    );
};

export default ProjectPageComponent;
