import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import UpdateProjectFormComponent from "../../forms/project/UpdateProjectFormComponent";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Role} from "../../api/project/project-member/response/Role";
import {api} from "../../api/AppApi";
import {getUserRole} from "../../components/authComponent";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {TIMEOUTS} from "../../utils/timeouts";

const UpdateProject: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { t } = useTranslation('projects');
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectResponse = await api.project.get(projectId!);
                setProject(projectResponse);

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

    if (currentUserRole === null || currentUserRole === Role.MAINTAINER || currentUserRole === Role.VISITOR) {
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
            <UpdateProjectFormComponent projectId={projectId!}/>
        </CustomLayout>
    );
}

export default UpdateProject;