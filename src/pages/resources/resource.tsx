import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress,
    Icon
} from '@mui/material';
import {api} from '../../api/AppApi';
import CustomLayout from "../../components/Layout/Layout";
import {ProjectMemberDto} from "../../api/project/project-member/response/ProjectMemberDto";
import {useTranslation} from "react-i18next";
import {ResourceDto} from "../../api/resources/response/ResourceDto";
import EditIcon from '@mui/icons-material/Edit';
import ButtonByResourceType from "../../components/TableImpl/ButtonByResourceType";


const ProjectPageComponent: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [resource, setResource] = useState<ResourceDto | null>(null);

    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<ProjectMemberDto | null>(null);
    const navigate = useNavigate();
    const {t} = useTranslation('overall')

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.resources.get(id!);
                setResource(response);

                if (response.createdById) {
                    const creatorResponse = await api.projectMember.getByIds(response.createdById, id!);
                    setCreator(creatorResponse);
                }
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleEdit = () => {
        navigate(`/project/resources/edit/${id}`);
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

    return (
        <CustomLayout>
            <Paper sx={{width: 'auto', mb: 2, margin: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2}}>
                    <Box sx={{width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2}}/>
                    <Typography variant="h5" component="div">
                        {resource.name}
                    </Typography>


                </Box>
                <Box sx={{padding: 3}}>
                    <Typography variant="body1" gutterBottom>
                        {resource.value}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {resource.description}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2}}>
                        <ButtonByResourceType id={resource.id} resourceType={resource.resourceType}
                                              value={resource.value}></ButtonByResourceType>
                        <Button variant="contained" color="primary" onClick={handleEdit} title={t('forms.edit')}>
                            <Icon
                                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <EditIcon>
                                </EditIcon>
                            </Icon>
                        </Button>
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