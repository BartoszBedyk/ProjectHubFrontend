import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import { Button, Typography, Box, Card, CardContent, Grid, Chip, Tooltip } from '@mui/material';
import { api } from "../../api/AppApi";
import { getUserId } from "../../storage/AuthStorage";
import { CriteriaOperator } from "../../commons/Search/CriteriaOperator";
import { SearchForm } from "../../commons/Search/SearchForm";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { ProjectDTO } from "../../api/project/response/ProjectDTO";
import { ResourceDto, ResourceType } from "../../api/resources/response/ResourceDto";
import { Link, Description, Lock, TextSnippet, Folder } from '@mui/icons-material';
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import { TechnologyDTO } from "../../api/project/technology/response/TechnologyDTO";
import { useTranslation } from 'react-i18next';

function HomePage() {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [resources, setResources] = useState<ResourceDto[]>([]);
    const [projectTechnologies, setProjectTechnologies] = useState<{ [key: string]: TechnologyDTO[] }>({});
    const [rolesMap, setRolesMap] = useState<{ [key: string]: string }>({});
    const [searchForm, setSearchForm] = useState<SearchForm>({
        criteria: [],
        page: 1,
        size: 3,
        sort: {
            by: 'createdOn',
            order: SearchSortOrder.DSC
        }
    });
    const { t: t2 } = useTranslation('roles');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = getUserId();
                if (userId) {
                    const projectCriteria = [
                        { fieldName: "members.userId", value: userId, operator: CriteriaOperator.EQUALS },
                        { fieldName: 'deletedOn', value: null, operator: CriteriaOperator.EQUALS }
                    ];

                    const resourceCriteria = [
                        { fieldName: 'createdById', value: userId, operator: CriteriaOperator.EQUALS }
                    ];

                    const updatedProjectSearchForm = { ...searchForm, criteria: projectCriteria };
                    const projectResponse = await api.project.search(updatedProjectSearchForm);
                    setProjects(projectResponse.items);

                    const techMap: { [key: string]: TechnologyDTO[] } = {};
                    for (const project of projectResponse.items) {
                        const techDetailsPromises = project.technologies.map((techId) => api.technology.findById(techId));
                        const techDetails = await Promise.all(techDetailsPromises);
                        techMap[project.id] = techDetails.filter(tech => tech !== undefined) as TechnologyDTO[];
                    }
                    setProjectTechnologies(techMap);

                    const rolePromises = projectResponse.items.map(project => api.projectMember.getByIds(userId, project.id));
                    const roleResponses = await Promise.all(rolePromises);

                    const roleMap: { [key: string]: string } = {};
                    roleResponses.forEach((role: ProjectMemberDto, index: number) => {
                        roleMap[projectResponse.items[index].id] = role.role;
                    });
                    setRolesMap(roleMap);

                    const updatedResourceSearchForm = { ...searchForm, criteria: resourceCriteria };
                    const resourceResponse = await api.resources.findByUserId(userId);

                    const sortedResources = resourceResponse.sort((a, b) => {
                        const dateA = a.lastModifiedOn ? new Date(a.lastModifiedOn) : new Date(a.createdOn);
                        const dateB = b.lastModifiedOn ? new Date(b.lastModifiedOn) : new Date(b.createdOn);
                        return dateB.getTime() - dateA.getTime();
                    });

                    setResources(sortedResources);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchForm]);

    const handleProjectsClick = () => {
        navigate('/project');
    };

    const handleCreateProjectClick = () => {
        navigate('/project/create');
    };

    const formatDate = (dateString: string | Date | null) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString();
    };

    const getLastModifiedOrCreatedDate = (resource: ResourceDto) => {
        return formatDate(resource.lastModifiedOn) !== "-" ? formatDate(resource.lastModifiedOn) : formatDate(resource.createdOn);
    };

    const getResourceIcon = (resourceType: ResourceType) => {
        switch (resourceType) {
            case ResourceType.link:
                return <Link />;
            case ResourceType.attachment:
                return <Description />;
            case ResourceType.secret:
                return <Lock />;
            case ResourceType.text:
                return <TextSnippet />;
            default:
                return <TextSnippet />;
        }
    };

    const handleProjectClick = (projectId: string) => {
        navigate(`/project/${projectId}`);
    };

    const handleResourceClick = (projectId: string, resourceId: string) => {
        navigate(`/project/${projectId}/resources/details/${resourceId}`);
    };

    return (
        <CustomLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'top',
                    height: '100vh',
                    textAlign: 'center',
                    marginTop: 5,
                    padding: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('welcome')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('check_projects')}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleProjectsClick}
                    sx={{ marginTop: '20px' }}
                >
                    {t('view_projects')}
                </Button>

                <Box sx={{ marginTop: 10, width: '100%' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {t('your_projects')}
                    </Typography>
                    {projects.length === 0 ? (
                        <Box textAlign="center">
                            <Typography variant="body1" color="text.secondary">
                                {t('no_projects')}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateProjectClick}
                                sx={{ marginTop: '20px' }}
                            >
                                {t('create_project')}
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={4} justifyContent="left">
                            {projects.map((project) => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <Card
                                        onClick={() => handleProjectClick(project.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            height: '100%',
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-5px)',
                                                transition: 'all 0.3s ease-in-out',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }}>
                                                <Tooltip title={`Projekt: ${project.name}`}>
                                                    <Folder sx={{ marginRight: 1 }} />
                                                </Tooltip>
                                                <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: 1 }}>
                                                    {project.name}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ marginBottom: 0.5, textAlign: 'left' }}>
                                                {projectTechnologies[project.id]?.map((tech, index) => (
                                                    <Chip key={index} label={tech.name} sx={{ backgroundColor: '#1976d2', color: '#fff', marginRight: 1 }} />
                                                ))}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
                                                {t('project_description')}: {project.description}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom sx={{ textAlign: 'left' }}>
                                                {t('created_on')}: {formatDate(project.createdOn)}
                                            </Typography>
                                            <Typography variant="caption" display="block" color="text.secondary" sx={{ textAlign: 'left' }}>
                                                {t('your_role')}: {rolesMap[project.id] ? t2(rolesMap[project.id]) : t('no_role')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>

                <Box sx={{ marginTop: 10, width: '100%' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {t('last_modified_resources')}
                    </Typography>
                    {resources.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            {t('no_resources')}
                        </Typography>
                    ) : (
                        <Grid container spacing={4} justifyContent="left">
                            {resources.map((resource) => (
                                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                                    <Card
                                        onClick={() => handleResourceClick(resource.projectId, resource.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            height: '100%',
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-5px)',
                                                transition: 'all 0.3s ease-in-out',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                <Tooltip title={`${t('resource_type')}: ${resource.resourceType}`} sx={{marginTop: 1}}>
                                                    {getResourceIcon(resource.resourceType)}
                                                </Tooltip>
                                                <Typography variant="h6" component="div" sx={{ marginLeft: 1, marginTop: 1 }}>
                                                    {resource.name}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
                                                {resource.description}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom sx={{ textAlign: 'left' }}>
                                                {t('last_modified')}: {getLastModifiedOrCreatedDate(resource)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </CustomLayout>
    );
}

export default HomePage;
