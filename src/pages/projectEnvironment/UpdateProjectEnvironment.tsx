import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import UpdateProjectEnvironmentFormComponent
    from "../../forms/projectEnvironment/UpdateProjectEnvironmentFormComponent";
import {useTranslation} from "react-i18next";
import {Role} from "../../api/project/project-member/response/Role";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {api} from "../../api/AppApi";
import {getUserRole} from "../../components/authComponent";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {TIMEOUTS} from "../../utils/timeouts";
import {ProjectEnvironmentDto} from "../../api/project/project-environment/response/ProjectEnvironmentDto";

const UpdateProjectEnvironment: React.FC = () => {
    const { environmentId } = useParams<{ environmentId: string }>();
    const { t } = useTranslation('environments');
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [environment, setEnvironment] = useState<ProjectEnvironmentDto | null>(null);

    useEffect(() => {
        const fetchEnvironmentDetails = async () => {
            try {
                const environmentResponse = await api.projectEnvironment.findById(environmentId!);
                setEnvironment(environmentResponse);
                const projectResponse = await api.project.get(environmentResponse.projectId);
                setProject(projectResponse);

                const role = await getUserRole(environmentResponse.projectId);
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching project environment:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnvironmentDetails();
    }, [environmentId]);

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

    if (!project) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('notFound2')}
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
            <UpdateProjectEnvironmentFormComponent environmentId={environmentId!} />
        </CustomLayout>
    );
}

export default UpdateProjectEnvironment;